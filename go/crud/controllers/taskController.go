package controllers

import (
	"log"

	"github.com/belekanych/sandbox/go/crud/requests"
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
    tasks.Post("/", taskController.Store)
    tasks.Post("/:id/delete", taskController.Delete)
}

func (ctr *TaskController) Index(c *fiber.Ctx) error {
	return c.Render("task/index", fiber.Map{
		"Title": "Tasks",
		"Tasks": ctr.ts.Index(),
	})
}

func (ctr *TaskController) Store(c *fiber.Ctx) error {
	r := new(requests.StoreTaskRequest)
	if err := c.BodyParser(r); err != nil {
		return err
	}

	if (r.Title == "") {
		return c.RedirectBack("/", fiber.StatusUnprocessableEntity)
	}

	if err := ctr.ts.Store(r.Title); err != nil {
		return c.RedirectBack("/", fiber.StatusInternalServerError)
	}

	return c.RedirectBack("/")
}

func (ctr *TaskController) Delete(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")

	if err != nil {
		return c.RedirectBack("/", fiber.StatusNotFound)
	}

	if err := ctr.ts.Delete(id); err != nil {
		log.Println("Error: " + err.Error())
		return c.RedirectBack("/", fiber.StatusInternalServerError)
	}

	return c.RedirectBack("/")
}