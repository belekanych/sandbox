package controllers

import (
	"time"

	"github.com/belekanych/sandbox/go/crud/bootstrap"
	"github.com/gofiber/fiber/v2"
)

func TaskIndexController(c *fiber.Ctx) error {
	return c.Render("task/index", fiber.Map{
		"Title": "Tasks",
		"Tasks": bootstrap.TaskService.Index(),
	})
}

func TaskStoreController(c *fiber.Ctx) error {
	bootstrap.TaskService.Store(time.Now().GoString())
	return c.RedirectBack("/")
}

func TaskDeleteController(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")

	if err != nil {
		return c.RedirectBack("/", fiber.StatusNotFound)
	}

	bootstrap.TaskService.Delete(id)

	return c.RedirectBack("/")
}