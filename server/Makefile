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
