DC=docker-compose
DC_EXEC=$(DC) exec
APP=$(DC_EXEC) app

start:
	$(DC) up -d

stop:
	$(DC) stop

ssh:
	$(APP) sh

server/run:
	$(APP) go run server/main.go

client/run:
	$(APP) go run client/main.go

generate:
	$(APP) protoc --proto_path=proto proto/*.proto --go_out=. --go-grpc_out=.
