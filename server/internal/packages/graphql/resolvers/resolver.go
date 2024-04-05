package resolvers

import (
	"log/slog"
	"server/internal/packages/utils"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	app    utils.Domain
	config utils.Config
	logger *slog.Logger
}

func NewResolver(config utils.Config, app utils.Domain, logger *slog.Logger) *Resolver {
	return &Resolver{
		app:    app,
		config: config,
		logger: logger,
	}
}
