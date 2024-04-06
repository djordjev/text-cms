package main

import (
	"context"
	"fmt"
	"github.com/djordjev/text-cms/server/internal/packages/app"
	"github.com/djordjev/text-cms/server/internal/packages/communication/graphql"
	"github.com/djordjev/text-cms/server/internal/packages/communication/grpc"
	"github.com/djordjev/text-cms/server/internal/packages/communication/rest"
	"github.com/djordjev/text-cms/server/internal/packages/repository"
	"github.com/djordjev/text-cms/server/internal/packages/utils"
	"github.com/redis/go-redis/v9"
	"log/slog"
	"os"
)

func main() {
	// parse config
	config, err := utils.ReadConfig(os.Getenv)
	if err != nil {
		fmt.Println("unable to read config")
		return
	}

	// create redis repository
	opts, err := redis.ParseURL(config.RedisURL)
	if err != nil {
		fmt.Println("unable to parse redis connection string")
		os.Exit(1)
	}

	client := redis.NewClient(opts)

	_, err = client.Ping(context.Background()).Result()
	if err != nil {
		fmt.Println("unable to connect to redis database")
		os.Exit(1)
	}

	repo := repository.NewRepo(client)

	// create logger
	logger := slog.New(slog.NewJSONHandler(os.Stdout, nil)).With("app", "text-cms")

	// create app logic layer
	domain := app.NewDomain(repo)

	// start server
	var server utils.Interface
	if config.Protocol == "rest" {
		server = rest.NewRestServer(config, domain, logger)
	} else if config.Protocol == "graphql" {
		server = graphql.NewGraphQLServer(config, domain, logger)
	} else if config.Protocol == "grpc" {
		server = grpc.NewGrpcServer(config, domain, logger)
	} else {
		fmt.Println("invalid protocol name", config.Protocol)
		os.Exit(1)
	}

	err = server.Run()
	if err != nil {
		fmt.Println("Shutting down the server")
	}

}
