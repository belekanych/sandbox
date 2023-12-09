package controllers

import (
	"github.com/belekanych/sandbox/go/crud/database"
	"github.com/belekanych/sandbox/go/crud/requests"
	"github.com/belekanych/sandbox/go/crud/services"
	"github.com/gofiber/fiber/v2"
)

type TaskController struct {
	ts *services.TaskService
}

func NewTaskController(ts *services.TaskService) *TaskController {
	return &TaskController{ts: ts}
}

func SetupTaskController(app *fiber.App, ts *services.TaskService) {
	taskController := NewTaskController(ts)

    app.Get("/", taskController.Index)

    tasks := app.Group("/tasks")
    tasks.Post("/", taskController.Store)
    tasks.Post("/:id/delete", taskController.Delete)
}

func (ctr *TaskController) Index(c *fiber.Ctx) error {
	db := database.NewConnection()
	defer db.CloseConnection()

	return c.Render("task/index", fiber.Map{
		"Title": "Tasks",
		"Tasks": ctr.ts.Index(db),
	})
}

func (ctr *TaskController) Store(c *fiber.Ctx) error {
	r, err := requests.NewStoreTaskRequest(c)

	if err != nil {
		return err
	}

	if err = r.Validate(); err != nil {
		return c.RedirectBack("/", fiber.StatusUnprocessableEntity)
	}

	db := database.NewConnection()
	defer db.CloseConnection()

	if err := ctr.ts.Store(db, r.Title); err != nil {
		return c.RedirectBack("/", fiber.StatusInternalServerError)
	}

	return c.RedirectBack("/")
}

func (ctr *TaskController) Delete(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")

	if err != nil {
		return c.RedirectBack("/", fiber.StatusNotFound)
	}

	db := database.NewConnection()
	defer db.CloseConnection()

	if err := ctr.ts.Delete(db, id); err != nil {
		return c.RedirectBack("/", fiber.StatusInternalServerError)
	}

	return c.RedirectBack("/")
}