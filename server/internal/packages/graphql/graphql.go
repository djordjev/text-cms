package graphql

import (
	"fmt"
	"github.com/99designs/gqlgen/graphql/playground"
	"log/slog"
	"net/http"
	graphql "server/internal/packages/graphql/generated"
	"server/internal/packages/graphql/resolvers"
	"server/internal/packages/middleware"
	"server/internal/packages/utils"

	"github.com/99designs/gqlgen/graphql/handler"
)

const Endpoint = "/graphql"

type Server struct {
	config utils.Config
	logger *slog.Logger
}

func (s *Server) Run() (err error) {
	addr := fmt.Sprintf(":%d", s.config.Port)

	s.logger.Info("Running server", "address", addr, "type", "GraphQL", "Endpoint", Endpoint)
	err = http.ListenAndServe(addr, nil)

	return
}

func NewGraphQLServer(config utils.Config, app utils.Domain, logger *slog.Logger) *Server {
	srv := &Server{config: config, logger: logger}

	graphqlConfig := graphql.Config{Resolvers: resolvers.NewResolver(config, app, logger)}
	mux := handler.NewDefaultServer(graphql.NewExecutableSchema(graphqlConfig))

	graphqlHandler := middleware.MwRecover(middleware.MwLogger(logger, func(w http.ResponseWriter, r *http.Request) {
		mux.ServeHTTP(w, r)
	}))

	http.Handle("/", playground.Handler("GraphQL playground", Endpoint))
	http.Handle(Endpoint, graphqlHandler)

	return srv
}
