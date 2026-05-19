package middleware

import (
	"fmt"
	"time"

	"github.com/QuantumNous/new-api/common"
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

const RouteTagKey = "route_tag"

func RouteTag(tag string) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Set(RouteTagKey, tag)
		c.Next()
	}
}

func SetUpLogger(server *gin.Engine) {
	server.Use(gin.LoggerWithFormatter(func(param gin.LogFormatterParams) string {
		var requestID string
		if param.Keys != nil {
			requestID, _ = param.Keys[common.RequestIdKey].(string)
		}
		tag, _ := param.Keys[RouteTagKey].(string)
		if tag == "" {
			tag = "web"
		}
		return fmt.Sprintf("[GIN] %s | %s | %s | %3d | %13v | %15s | %7s %s\n",
			param.TimeStamp.Format("2006/01/02 - 15:04:05"),
			tag,
			requestID,
			param.StatusCode,
			param.Latency,
			param.ClientIP,
			param.Method,
			param.Path,
		)
	}))
}

func newGinZapLogger() gin.HandlerFunc {
	logger, _ := zap.NewProduction()
	return func(c *gin.Context) {
		start := time.Now()
		path := c.Request.URL.Path
		_ = c.Request.URL.RawQuery

		c.Next()

		latency := time.Since(start)
		statusCode := c.Writer.Status()

		fields := []zapcore.Field{
			zap.Int("status", statusCode),
			zap.String("method", c.Request.Method),
			zap.String("path", path),
			zap.String("ip", c.ClientIP()),
			zap.Duration("latency", latency),
		}

		if requestID := c.GetString(common.RequestIdKey); requestID != "" {
			fields = append(fields, zap.String("requestId", requestID))
		}

		if len(c.Errors) > 0 {
			for _, e := range c.Errors {
				logger.Error(e.Err.Error(), fields...)
			}
		} else {
			logger.Info(path, fields...)
		}
	}
}
