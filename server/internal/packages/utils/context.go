package utils

import (
	"context"
	"errors"
	"log/slog"
	"net/http"
)

var ErrNoLoggerInContext = errors.New("no logger in context")

func AddLoggerToContext(ctx context.Context, logger *slog.Logger) context.Context {
	return context.WithValue(ctx, "logger", logger)
}

func AddLoggerToRequestContext(req *http.Request, logger *slog.Logger) *http.Request {
	newContext := AddLoggerToContext(req.Context(), logger)

	return req.WithContext(newContext)
}

func GetLoggerFromContext(ctx context.Context) *slog.Logger {
	logger := ctx.Value("logger")

	if l, ok := logger.(*slog.Logger); ok {
		return l
	}

	panic(ErrNoLoggerInContext)
}
