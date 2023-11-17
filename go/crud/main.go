package main

import (
	"log"
	"os"

	"github.com/belekanych/sandbox/go/crud/bootstrap"
	"github.com/belekanych/sandbox/go/crud/controllers"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/template/html/v2"
)

func init() {
    bootstrap.LoadEnvVariables()
    bootstrap.LoadTaskService()
}

func main() {
    engine := html.New("./views", ".html")

    app := fiber.New(fiber.Config{
        Views: engine,
    })

    app.Get("/", controllers.TaskIndexController)

    tasks := app.Group("/tasks")
    tasks.Get("/store", controllers.TaskStoreController)
    tasks.Get("/delete/:id", controllers.TaskDeleteController)

    log.Fatal(app.Listen(":" + os.Getenv("PORT")))
}