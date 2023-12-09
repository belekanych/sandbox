package controllers

import (
	"github.com/belekanych/sandbox/go/crud/services"
	"github.com/gofiber/fiber/v2"
)

type HomeController struct {
	ts *services.TaskService
}

func NewHomeController(ts *services.TaskService) *HomeController {
	return &HomeController{ ts: ts }
}

func SetupHomeController(app *fiber.App, ts *services.TaskService) {
	ctr := NewHomeController(ts)

    app.Get("/", ctr.Index)
}

func (ctr *HomeController) Index(c *fiber.Ctx) error {
	return c.Render("index", fiber.Map{
		"Title": "Tasks",
	})
}
