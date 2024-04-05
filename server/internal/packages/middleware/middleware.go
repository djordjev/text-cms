package middleware

import (
	"fmt"
	"log/slog"
	"net/http"
	"server/internal/packages/utils"
	"time"
)

type responseWriter struct {
	http.ResponseWriter
	status      int
	wroteHeader bool
}

func wrapResponseWriter(w http.ResponseWriter) *responseWriter {
	return &responseWriter{ResponseWriter: w}
}

func (rw *responseWriter) Status() int {
	return rw.status
}

func (rw *responseWriter) Write(data []byte) (int, error) {
	rw.status = http.StatusOK

	return rw.ResponseWriter.Write(data)
}

func (rw *responseWriter) WriteHeader(code int) {
	if rw.wroteHeader {
		return
	}

	rw.status = code
	rw.ResponseWriter.WriteHeader(code)
	rw.wroteHeader = true
}

func MwLogger(logger *slog.Logger, next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()

		childLogger := logger.With("url", r.URL.Path)
		wrapped := wrapResponseWriter(w)

		defer func() {
			duration := fmt.Sprintf("ms: %.2f", float64(time.Since(start))/float64(time.Millisecond))
			childLogger.Info("request", "duration", duration, "status", wrapped.Status())
		}()

		next.ServeHTTP(wrapped, utils.AddLoggerToRequestContext(r, logger))
	}
}

func MwRecover(next http.HandlerFunc) http.HandlerFunc {
	return func(writer http.ResponseWriter, request *http.Request) {
		defer func() {
			if r := recover(); r != nil {
				fmt.Println(fmt.Sprintf("recovering http server from %v", r))
			}
		}()

		next(writer, request)
	}
}
