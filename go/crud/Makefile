DC=docker-compose
DC_EXEC=$(DC) exec
API=$(DC_EXEC) api

start:
	$(DC) up -d

stop:
	$(DC) stop

ssh:
	$(API) sh

run:
	$(API) go run main.go
