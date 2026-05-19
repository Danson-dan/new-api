package common

import (
	"fmt"
	"os"
	"sync"
	"time"

	"go.uber.org/zap"
)

var LogWriterMu sync.RWMutex

var sysLogger *zap.SugaredLogger

func InitSysLogger(logger *zap.SugaredLogger) {
	sysLogger = logger
}

func SysLog(s string) {
	if sysLogger != nil {
		sysLogger.Infow(s, "requestId", "SYSTEM")
		return
	}
	t := time.Now()
	LogWriterMu.RLock()
	defer LogWriterMu.RUnlock()
	fmt.Fprintf(os.Stdout, "[SYS] %v | %s \n", t.Format("2006/01/02 - 15:04:05"), s)
}

func SysError(s string) {
	if sysLogger != nil {
		sysLogger.Errorw(s, "requestId", "SYSTEM")
		return
	}
	t := time.Now()
	LogWriterMu.RLock()
	defer LogWriterMu.RUnlock()
	fmt.Fprintf(os.Stderr, "[SYS] %v | %s \n", t.Format("2006/01/02 - 15:04:05"), s)
}

func FatalLog(v ...any) {
	if sysLogger != nil {
		sysLogger.Fatalw("FATAL", "details", v)
	}
	os.Exit(1)
}

func LogStartupSuccess(startTime time.Time, port string) {
	duration := time.Since(startTime)
	durationMs := duration.Milliseconds()

	networkIps := GetNetworkIps()

	fmt.Fprintf(os.Stdout, "\n")
	fmt.Fprintf(os.Stdout, "  \033[32m%s %s\033[0m  ready in %d ms\n", SystemName, Version, durationMs)
	fmt.Fprintf(os.Stdout, "\n")

	if !IsRunningInContainer() {
		fmt.Fprintf(os.Stdout, "  ➜  \033[1mLocal:\033[0m   http://localhost:%s/\n", port)
	}

	for _, ip := range networkIps {
		fmt.Fprintf(os.Stdout, "  ➜  \033[1mNetwork:\033[0m http://%s:%s/\n", ip, port)
	}

	fmt.Fprintf(os.Stdout, "\n")
}
