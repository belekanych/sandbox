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

build:
	$(NODE) npm run build

firebase/install:
	$(NODE) npm install -g firebase-tools

firebase/login:
	$(NODE) firebase login

deploy:
	$(NODE) firebase deploy
