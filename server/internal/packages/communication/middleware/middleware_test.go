package middleware

import (
	"bytes"
	"encoding/json"
	"errors"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"log/slog"
	"net/http"
	"net/http/httptest"
	"testing"
)

type mockLogger struct {
	mock.Mock
	slog.Logger
}

func (l *mockLogger) With(args ...any) *slog.Logger {
	c := l.Called(args...)
	return c.Get(0).(*slog.Logger)
}

func (l *mockLogger) Info(msg string, args ...any) {
	allArgs := []any{msg}
	allArgs = append(allArgs, args...)
	l.Called(allArgs...)

	return
}

func TestMwLogger(t *testing.T) {
	next := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) { w.WriteHeader(http.StatusOK) })
	buffer := bytes.Buffer{}
	logger := slog.New(slog.NewJSONHandler(&buffer, nil))

	req := httptest.NewRequest(http.MethodPost, "/something", nil)

	MwLogger(logger, next)(httptest.NewRecorder(), req)

	entry := make(map[string]any)

	err := json.Unmarshal(buffer.Bytes(), &entry)
	if err != nil {
		require.Fail(t, "json unmarshal failed", err)
	}

	level := entry["level"]
	url := entry["url"]
	status := entry["status"]
	duration := entry["duration"]

	require.Equal(t, level, "INFO")
	require.Equal(t, url, req.URL.Path)
	require.Equal(t, status, float64(http.StatusOK))
	require.Contains(t, duration, "ms: ")
}

func TestMwRecover(t *testing.T) {
	next := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) { panic(errors.New("panic error")) })
	buffer := bytes.Buffer{}
	logger := slog.New(slog.NewJSONHandler(&buffer, nil))

	req := httptest.NewRequest(http.MethodPost, "/something", nil)
	MwRecover(logger, next)(httptest.NewRecorder(), req)

	require.Contains(t, buffer.String(), "recovering http server from panic error")

}
