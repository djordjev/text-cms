package utils

import (
	"context"
	"errors"
)

type Request struct {
	Path    string
	Payload map[string]any
}

type Response string

type Variation struct {
	Id        string
	Name      string
	Condition string
	Text      string
}

type Domain interface {
	GetFileContent(ctx context.Context, request Request) (response Response, err error)
}

type Interface interface {
	Run() error
}

var ErrFileNotFound = errors.New("file not found")
