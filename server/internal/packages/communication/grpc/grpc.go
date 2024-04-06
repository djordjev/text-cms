package grpc

import (
	"github.com/djordjev/text-cms/server/internal/packages/utils"
	"log/slog"
)

type Server struct{}

func (s Server) Run() error {
	//TODO implement me
	panic("implement me")
}

func NewGrpcServer(config utils.Config, app utils.Domain, logger *slog.Logger) *Server {
	return &Server{}
}
