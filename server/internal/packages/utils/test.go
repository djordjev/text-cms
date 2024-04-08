package utils

import (
	"io"
	"log/slog"
)

func NewEmptyLogger() *slog.Logger {
	return slog.New(slog.NewJSONHandler(io.Discard, nil))
}
