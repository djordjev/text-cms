package utils

import (
	"errors"
	"strconv"
	"strings"
)

type Config struct {
	Method   string
	Port     int
	RedisURL string
	Protocol string
}

type EnvReader func(string) string

func ReadConfig(reader EnvReader) (cfg Config, err error) {
	redis := reader("REDIS_URL")
	port := reader("PORT")
	method := reader("METHOD")
	protocol := reader("PROTOCOL")

	if redis == "" {
		err = errors.New("unable to read redis env variable")
		return
	}

	if port == "" {
		cfg.Port = 3004
	} else {
		cfg.Port, err = strconv.Atoi(port)
		if err != nil {
			return
		}
	}

	if method == "" {
		cfg.Method = "GET"
	} else {
		cfg.Method = strings.ToUpper(method)
	}

	cfg.RedisURL = redis

	if protocol == "" {
		cfg.Protocol = "rest"
	} else {
		cfg.Protocol = strings.ToLower(protocol)
	}

	return
}
