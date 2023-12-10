package main

import (
	"log"
	"os"

	"github.com/belekanych/sandbox/go/crud/bootstrap"
	"github.com/belekanych/sandbox/go/crud/controllers"
	_ "github.com/go-sql-driver/mysql"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/template/html/v2"
)

func init() {
    bootstrap.LoadEnvVariables()
	bootstrap.LoadIocContainer()
}

func main() {
    app := fiber.New(fiber.Config{
        Views: html.New("./views", ".html"),
    })

	ctr(app)

    log.Fatal(app.Listen(":" + os.Getenv("APP_PORT")))
}

func ctr(app *fiber.App) {
	ctrs := []func(*fiber.App) error {
		controllers.SetupHomeController,
		controllers.SetupTaskController,
	}

	for _, c := range ctrs {
		err := c(app)
		if err != nil {
			panic(err)
		}
	}
}