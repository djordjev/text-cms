BINARY_NAME=server

build:
	go build -o ./_out/${BINARY_NAME} ./cmd/server.go

clean:
	rm -f ./_out/coverage.out
	rm -f ./_out/server.go

test_coverage:
	go test -v ./... -coverprofile=_out/coverage.out
	go tool cover -html="_out/coverage.out"

test:
	go test -v ./...

graphql_generate:
	go run github.com/99designs/gqlgen generate

grpc_generate:
	protoc -I../proto --go_out=. --go_opt=module=github.com/djordjev/text-cms/server --go-grpc_out=. --go-grpc_opt=module=github.com/djordjev/text-cms/server ../proto/messages.proto
