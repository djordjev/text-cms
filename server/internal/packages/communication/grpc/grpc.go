package grpc

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/djordjev/text-cms/server/internal/packages/utils"
	"google.golang.org/grpc"
	"log/slog"
	"net"
)

type Server struct {
	TextServiceServer
	app    utils.Domain
	config utils.Config
	logger *slog.Logger
}

func (s *Server) Run() error {
	addr := fmt.Sprintf(":%d", s.config.Port)
	listener, err := net.Listen("tcp", addr)
	if err != nil {
		return err
	}

	s.logger.Info("Running server", "address", addr, "type", "gRPC")

	srv := grpc.NewServer()

	RegisterTextServiceServer(srv, s)

	if srvErr := srv.Serve(listener); srvErr != nil {
		return fmt.Errorf("unable to listen on created listener %w", srvErr)
	}

	return nil
}

func NewGrpcServer(config utils.Config, app utils.Domain, logger *slog.Logger) *Server {
	return &Server{
		app:    app,
		config: config,
		logger: logger,
	}
}

func (s *Server) GetText(ctx context.Context, req *TextRequest) (*TextResponse, error) {
	payload := map[string]any{}

	err := json.Unmarshal([]byte(req.Payload), &payload)
	if err != nil {
		return nil, fmt.Errorf("unable to parse payload: %w", err)
	}

	request := utils.Request{Path: req.File, Payload: payload}

	response, err := s.app.GetFileContent(utils.AddLoggerToContext(ctx, s.logger), request)
	if err != nil {
		return nil, fmt.Errorf("unable to get file content: %w", err)
	}

	res := TextResponse{Payload: string(response)}

	return &res, nil
}
