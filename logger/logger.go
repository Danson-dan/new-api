package logger

import (
	"context"
	"fmt"
	"io"
	"os"
	"sync"
	"time"

	"github.com/QuantumNous/new-api/common"
	"github.com/QuantumNous/new-api/setting/operation_setting"

	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
	"gopkg.in/natefinch/lumberjack.v2"
)

var (
	zapLogger     *zap.SugaredLogger
	zapAtomic     zap.AtomicLevel
	initOnce      sync.Once
	mu            sync.RWMutex
	currentWriter *lumberjack.Logger
)

func SetupLogger() {
	initOnce.Do(func() {
		logDir := *common.LogDir
		if logDir == "" {
			logDir = "./logs"
		}

		writer := &lumberjack.Logger{
			Filename:   fmt.Sprintf("%s/new-api.log", logDir),
			MaxSize:    100,
			MaxBackups: 30,
			MaxAge:     30,
			Compress:   true,
			LocalTime:  true,
		}

		zapAtomic = zap.NewAtomicLevel()

		var encoder zapcore.Encoder
		var encoderConfig zapcore.EncoderConfig
		var level zapcore.Level

		if common.DebugEnabled || os.Getenv("LOG_FORMAT") != "json" {
			encoderConfig = zap.NewDevelopmentEncoderConfig()
			encoderConfig.EncodeLevel = zapcore.CapitalColorLevelEncoder
			encoderConfig.EncodeTime = func(t time.Time, enc zapcore.PrimitiveArrayEncoder) {
				enc.AppendString(t.Format("2006/01/02 - 15:04:05"))
			}
			encoder = zapcore.NewConsoleEncoder(encoderConfig)
			level = zapcore.DebugLevel
		} else {
			encoderConfig = zap.NewProductionEncoderConfig()
			encoderConfig.TimeKey = "ts"
			encoderConfig.EncodeTime = zapcore.ISO8601TimeEncoder
			encoder = zapcore.NewJSONEncoder(encoderConfig)
			level = zapcore.InfoLevel
		}
		zapAtomic.SetLevel(level)

		multiWriter := zapcore.NewMultiWriteSyncer(
			zapcore.AddSync(os.Stdout),
			zapcore.AddSync(writer),
		)

		core := zapcore.NewCore(encoder, multiWriter, zapAtomic)
		l := zap.New(core, zap.AddCaller(), zap.AddCallerSkip(1))

		zapLogger = l.Sugar()

		gin.DefaultWriter = io.Discard
		gin.DefaultErrorWriter = os.Stderr

		mu.Lock()
		currentWriter = writer
		mu.Unlock()

		common.InitSysLogger(zapLogger)
	})
}

func Sync() {
	mu.RLock()
	defer mu.RUnlock()
	if zapLogger != nil {
		_ = zapLogger.Sync()
	}
}

func GetCurrentLogPath() string {
	mu.RLock()
	defer mu.RUnlock()
	if currentWriter != nil {
		return currentWriter.Filename
	}
	return ""
}

func SetLevel(level string) {
	switch level {
	case "debug":
		zapAtomic.SetLevel(zapcore.DebugLevel)
	case "info":
		zapAtomic.SetLevel(zapcore.InfoLevel)
	case "warn":
		zapAtomic.SetLevel(zapcore.WarnLevel)
	case "error":
		zapAtomic.SetLevel(zapcore.ErrorLevel)
	}
}

func LogInfo(ctx context.Context, msg string) {
	logHelper(ctx, zapcore.InfoLevel, msg)
}

func LogWarn(ctx context.Context, msg string) {
	logHelper(ctx, zapcore.WarnLevel, msg)
}

func LogError(ctx context.Context, msg string) {
	logHelper(ctx, zapcore.ErrorLevel, msg)
}

func LogDebug(ctx context.Context, msg string, args ...any) {
	if common.DebugEnabled {
		if len(args) > 0 {
			msg = fmt.Sprintf(msg, args...)
		}
		logHelper(ctx, zapcore.DebugLevel, msg)
	}
}

func logHelper(ctx context.Context, level zapcore.Level, msg string) {
	if zapLogger == nil {
		return
	}
	requestId := extractRequestId(ctx)
	switch level {
	case zapcore.DebugLevel:
		zapLogger.Debugw(msg, "requestId", requestId)
	case zapcore.InfoLevel:
		zapLogger.Infow(msg, "requestId", requestId)
	case zapcore.WarnLevel:
		zapLogger.Warnw(msg, "requestId", requestId)
	case zapcore.ErrorLevel:
		zapLogger.Errorw(msg, "requestId", requestId)
	}
}

func extractRequestId(ctx context.Context) string {
	if ctx == nil {
		return "SYSTEM"
	}
	if id := ctx.Value(common.RequestIdKey); id != nil {
		return fmt.Sprint(id)
	}
	if c, ok := ctx.(*gin.Context); ok {
		if id := c.GetString(common.RequestIdKey); id != "" {
			return id
		}
	}
	return "SYSTEM"
}

func LogQuota(quota int) string {
	q := float64(quota)
	switch operation_setting.GetQuotaDisplayType() {
	case operation_setting.QuotaDisplayTypeCNY:
		usd := q / common.QuotaPerUnit
		cny := usd * operation_setting.USDExchangeRate
		return fmt.Sprintf("¥%.6f 额度", cny)
	case operation_setting.QuotaDisplayTypeCustom:
		usd := q / common.QuotaPerUnit
		rate := operation_setting.GetGeneralSetting().CustomCurrencyExchangeRate
		symbol := operation_setting.GetGeneralSetting().CustomCurrencySymbol
		if symbol == "" {
			symbol = "¤"
		}
		if rate <= 0 {
			rate = 1
		}
		v := usd * rate
		return fmt.Sprintf("%s%.6f 额度", symbol, v)
	case operation_setting.QuotaDisplayTypeTokens:
		return fmt.Sprintf("%d 点额度", quota)
	default:
		return fmt.Sprintf("＄%.6f 额度", q/common.QuotaPerUnit)
	}
}

func FormatQuota(quota int) string {
	q := float64(quota)
	switch operation_setting.GetQuotaDisplayType() {
	case operation_setting.QuotaDisplayTypeCNY:
		usd := q / common.QuotaPerUnit
		cny := usd * operation_setting.USDExchangeRate
		return fmt.Sprintf("¥%.6f", cny)
	case operation_setting.QuotaDisplayTypeCustom:
		usd := q / common.QuotaPerUnit
		rate := operation_setting.GetGeneralSetting().CustomCurrencyExchangeRate
		symbol := operation_setting.GetGeneralSetting().CustomCurrencySymbol
		if symbol == "" {
			symbol = "¤"
		}
		if rate <= 0 {
			rate = 1
		}
		v := usd * rate
		return fmt.Sprintf("%s%.6f", symbol, v)
	case operation_setting.QuotaDisplayTypeTokens:
		return fmt.Sprintf("%d", quota)
	default:
		return fmt.Sprintf("＄%.6f", q/common.QuotaPerUnit)
	}
}

func LogJson(ctx context.Context, msg string, obj any) {
	jsonStr, err := common.Marshal(obj)
	if err != nil {
		LogError(ctx, fmt.Sprintf("json marshal failed: %s", err.Error()))
		return
	}
	LogDebug(ctx, fmt.Sprintf("%s | %s", msg, string(jsonStr)))
}
