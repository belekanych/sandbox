DC=docker-compose
DC_EXEC=$(DC) exec
CLIENT=$(DC_EXEC) client
SERVER=$(DC_EXEC) server

# GENERAL
start:
	$(DC) up -d

stop:
	$(DC) stop

# CLIENT
client/ssh:
	$(CLIENT) sh

client/install:
	$(CLIENT) npm install

client/dev:
	$(CLIENT) npm run dev

# SERVER
server/ssh:
	$(SERVER) sh

server/install:
	$(SERVER) npm install

server/dev:
	$(SERVER) npm run dev
