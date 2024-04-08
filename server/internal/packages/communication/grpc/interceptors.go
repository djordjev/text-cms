package grpc

import (
	"context"
	"fmt"
	"github.com/djordjev/text-cms/server/internal/packages/utils"
	"google.golang.org/grpc"
	"log/slog"
	"time"
)

func logInterceptor(logger *slog.Logger) grpc.UnaryServerInterceptor {
	return func(ctx context.Context, req any, info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (any, error) {
		start := time.Now()

		childLogger := logger.With("url", info.FullMethod)

		defer func() {
			duration := fmt.Sprintf("ms: %.2f", float64(time.Since(start))/float64(time.Millisecond))
			childLogger.Info("request", "duration", duration)
		}()

		resp, err := handler(utils.AddLoggerToContext(ctx, logger), req)

		return resp, err
	}
}

func recoverInterceptor(logger *slog.Logger) grpc.UnaryServerInterceptor {
	return func(ctx context.Context, req any, info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (any, error) {
		defer func() {
			if r := recover(); r != nil {
				logger.Error("Recovered from panic in handler", "err", r)
			}
		}()

		resp, err := handler(ctx, req)

		return resp, err
	}
}
