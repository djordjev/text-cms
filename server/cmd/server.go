package main

import (
	"context"
	"fmt"
	"github.com/redis/go-redis/v9"
	"log/slog"
	"os"
	"server/internal/packages/app"
	"server/internal/packages/repository"
	"server/internal/packages/rest"
	"server/internal/packages/utils"
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
	server := rest.NewRestServer(config, domain, logger)
	server.Run()
}
