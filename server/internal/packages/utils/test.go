package utils

import (
	"bytes"
	"log/slog"
)

func NewEmptyLogger() *slog.Logger {
	var buffer bytes.Buffer
	logger := slog.New(slog.NewJSONHandler(&buffer, nil))

	return logger
}
