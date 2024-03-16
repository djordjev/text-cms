FROM golang:1.22-alpine as builder

WORKDIR "/usr/app"

ADD . .

RUN ["go", "mod", "tidy"]

RUN ["go", "build", "-o", "./_out/server", "./cmd/server.go"]

FROM alpine:latest

WORKDIR "/usr/app"

COPY --from=builder /usr/app/_out/server server

RUN chmod -R 777 server

CMD ./server

EXPOSE 3004
