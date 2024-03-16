package rest

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log/slog"
	"net/http"
	"server/internal/packages/utils"
	"time"
)

const Timeout = 5 * time.Second

type Server struct {
	app    Domain
	config utils.Config
	logger *slog.Logger
	mux    *http.ServeMux
}

type Domain interface {
	GetFileContent(ctx context.Context, request utils.Request) (response utils.Response, err error)
}

func (s *Server) Run() (err error) {
	addr := fmt.Sprintf(":%d", s.config.Port)

	s.logger.Info("Running server", "address", addr)
	err = http.ListenAndServe(addr, s.mux)

	return
}

func (s *Server) getFile(w http.ResponseWriter, r *http.Request) {
	pathname := fmt.Sprintf("/%s", r.PathValue("pathname"))

	payload := make(map[string]any)

	body, err := io.ReadAll(r.Body)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	json.Unmarshal(body, &payload)

	request := utils.Request{
		Path:    pathname,
		Payload: payload,
	}

	ctx, _ := context.WithTimeout(r.Context(), Timeout)

	response, err := s.app.GetFileContent(ctx, request)
	if errors.Is(err, utils.ErrFileNotFound) {
		w.WriteHeader(http.StatusNotFound)
		return
	} else if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(response))
}

func (s *Server) ping(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("pong"))
}

func (s *Server) setUpRoutes() {
	fileEndpoint := fmt.Sprintf("%s /file/{pathname...}", s.config.Method)

	s.logger.Info(fmt.Sprintf("setting up the route to %s", fileEndpoint))

	logMiddleware := newMiddlewareLogger(s.logger)

	s.mux.HandleFunc(fileEndpoint, logMiddleware.mwLogger(s.getFile))
	s.mux.HandleFunc("GET /ping", logMiddleware.mwLogger(s.ping))
}

func NewRestServer(config utils.Config, app Domain, logger *slog.Logger) *Server {
	srv := &Server{app: app, config: config, logger: logger}

	srv.mux = http.NewServeMux()
	srv.setUpRoutes()

	return srv
}
