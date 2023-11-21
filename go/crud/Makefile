DC=docker-compose
DC_EXEC=$(DC) exec
WEB=$(DC_EXEC) web

start:
	$(DC) up -d

stop:
	$(DC) stop

ssh:
	$(WEB) sh

run:
	$(WEB) go run main.go
