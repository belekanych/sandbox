package controllers

import (
	"github.com/gofiber/fiber/v2"
)

type HomeController struct {}

func NewHomeController() *HomeController {
	return &HomeController{}
}

func SetupHomeController(app *fiber.App) error {
	ctr := NewHomeController()

    app.Get("/", ctr.Index)

	return nil
}

func (ctr *HomeController) Index(c *fiber.Ctx) error {
	return c.Render("index", fiber.Map{
		"Title": "Tasks",
	})
}
