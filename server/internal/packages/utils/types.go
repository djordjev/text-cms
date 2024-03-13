package utils

import "errors"

type Request struct {
	Path    string
	Payload map[string]any
}

type Response string

type File struct {
	Id        string
	Name      string
	Condition string
	Text      string
}

var ErrFileNotFound = errors.New("file not found")
