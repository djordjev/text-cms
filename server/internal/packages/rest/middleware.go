package rest

import (
	"fmt"
	"log/slog"
	"net/http"
	"time"
)

type middlewareLogger struct {
	logger *slog.Logger
}

func (m *middlewareLogger) mwLogger(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()

		childLogger := m.logger.With("url", r.URL.Path)

		defer func() {
			duration := fmt.Sprintf("ms: %.2f", float64(time.Since(start))/float64(time.Millisecond))
			childLogger.Info("request", "duration", duration)
		}()

		next.ServeHTTP(w, r)
	}
}

func newMiddlewareLogger(logger *slog.Logger) *middlewareLogger {
	return &middlewareLogger{logger: logger}
}
