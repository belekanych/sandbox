DC=docker-compose
DC_EXEC=$(DC) exec
GO=$(DC_EXEC) web

start:
	$(DC) up -d

stop:
	$(DC) stop

ssh:
	$(GO) sh
