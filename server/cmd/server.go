package main

import (
	"fmt"
	"github.com/redis/go-redis/v9"
	"os"
	"server/internal/packages/app"
	"server/internal/packages/repository"
	"server/internal/packages/rest"
	"server/internal/packages/utils"
)

func main() {
	config, err := utils.ReadConfig(os.Getenv)
	if err != nil {
		fmt.Println("unable to read config")
		return
	}

	client := redis.NewClient(&redis.Options{
		Addr: config.RedisURL,
	})

	repo := repository.NewRepo(client)

	domain := app.NewDomain(repo)

	server := rest.NewRestServer(config, domain)
	server.Run()
}
