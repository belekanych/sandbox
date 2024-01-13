DC=docker-compose
DC_EXEC=$(DC) exec
NODE=$(DC_EXEC) mealio

# GENERAL
start:
	$(DC) up -d

stop:
	$(DC) stop

# NODE
ssh:
	$(NODE) sh

install:
	$(NODE) npm install

dev:
	$(NODE) npm run dev
