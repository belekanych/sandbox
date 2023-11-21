package main

import (
	"log"
	"os"

	"github.com/belekanych/sandbox/go/crud/bootstrap"
	"github.com/belekanych/sandbox/go/crud/controllers"
	"github.com/belekanych/sandbox/go/crud/services"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/template/html/v2"
)

func init() {
    bootstrap.LoadEnvVariables()
}

func main() {
    app := fiber.New(fiber.Config{
        Views: html.New("./views", ".html"),
    })

    controllers.SetupTaskController(app, services.CreateNewTaskService())

    log.Fatal(app.Listen(":" + os.Getenv("APP_PORT")))
}