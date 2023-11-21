package controllers

import (
	"log"
	"time"

	"github.com/belekanych/sandbox/go/crud/services"
	"github.com/gofiber/fiber/v2"
)

type TaskController struct {
	ts *services.TaskService
}

func CreateNewTaskController(ts *services.TaskService) *TaskController {
	log.Println("Task controller created")

	return &TaskController{ts: ts}
}

func SetupTaskController(app *fiber.App, ts *services.TaskService) {
	taskController := CreateNewTaskController(ts)

    app.Get("/", taskController.Index)

    tasks := app.Group("/tasks")
    tasks.Get("/store", taskController.Store)
    tasks.Get("/delete/:id", taskController.Delete)
}

func (ctr *TaskController) Index(c *fiber.Ctx) error {
	return c.Render("task/index", fiber.Map{
		"Title": "Tasks",
		"Tasks": ctr.ts.Index(),
	})
}

func (ctr *TaskController) Store(c *fiber.Ctx) error {
	ctr.ts.Store(time.Now().GoString())
	return c.RedirectBack("/")
}

func (ctr *TaskController) Delete(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")

	if err != nil {
		return c.RedirectBack("/", fiber.StatusNotFound)
	}

	ctr.ts.Delete(id)

	return c.RedirectBack("/")
}