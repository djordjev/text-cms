package rest

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"server/internal/packages/utils"
	"time"
)

const Timeout = 5 * time.Second

type Server struct {
	app    Domain
	config utils.Config
	mux    *http.ServeMux
}

type Domain interface {
	GetFileContent(ctx context.Context, request utils.Request) (response utils.Response, err error)
}

func (s *Server) Run() (err error) {
	addr := fmt.Sprintf("localhost:%d", s.config.Port)

	fmt.Printf("Running server %s\n", addr)
	err = http.ListenAndServe(addr, s.mux)

	return
}

func (s *Server) setUpRoutes() {
	s.mux.HandleFunc(fmt.Sprintf("%s /file/{pathname...}", s.config.Method),
		func(w http.ResponseWriter, r *http.Request) {
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
			if err != nil {
				w.WriteHeader(http.StatusInternalServerError)
				return
			}

			responseBytes, err := json.Marshal(response)
			if err != nil {
				w.WriteHeader(http.StatusInternalServerError)
				return
			}

			w.Write(responseBytes)
		})
}

func NewRestServer(config utils.Config, app Domain) *Server {
	srv := &Server{app: app, config: config}

	srv.mux = http.NewServeMux()
	srv.setUpRoutes()

	return srv
}
