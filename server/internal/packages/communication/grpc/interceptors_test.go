package grpc

import (
	"bytes"
	"context"
	"encoding/json"
	"github.com/stretchr/testify/require"
	"google.golang.org/grpc"
	"log/slog"
	"testing"
)

func TestLogInterceptor(t *testing.T) {
	buffer := bytes.Buffer{}
	logger := slog.New(slog.NewJSONHandler(&buffer, nil))
	ctx := context.TODO()

	var req any
	req = "anything"

	info := &grpc.UnaryServerInfo{FullMethod: "full_method"}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return nil, nil
	}

	logInterceptor(logger)(ctx, req, info, handler)

	entry := make(map[string]any)

	err := json.Unmarshal(buffer.Bytes(), &entry)
	if err != nil {
		require.Fail(t, "json unmarshal failed", err)
	}

	level := entry["level"]
	url := entry["url"]
	duration := entry["duration"]

	require.Equal(t, level, "INFO")
	require.Equal(t, url, "full_method")
	require.Contains(t, duration, "ms: ")
}

func TestRecoverInterceptor(t *testing.T) {
	buffer := bytes.Buffer{}
	logger := slog.New(slog.NewJSONHandler(&buffer, nil))
	ctx := context.TODO()

	var req any
	req = "anything"

	info := &grpc.UnaryServerInfo{FullMethod: "full_method"}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		panic("panics")
		return nil, nil
	}

	recoverInterceptor(logger)(ctx, req, info, handler)

	require.Contains(t, buffer.String(), "Recovered from panic in handler")
	require.Contains(t, buffer.String(), "panics")
}
