package controllers

import (
	"log"

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

    tasks := app.Group("/tasks")
	tasks.Get("/", taskController.Index)
    tasks.Post("/", taskController.Store)
    tasks.Delete("/:id", taskController.Delete)
}

func (ctr *TaskController) Index(c *fiber.Ctx) error {
	db := database.NewConnection()
	defer db.CloseConnection()

	tasks, err := ctr.ts.Index(db)

	if err != nil {
		log.Println(err)

		return c.Render("common/errors/500", fiber.Map{})
	}

	return c.Render("task/index", fiber.Map{
		"Tasks": tasks,
	})
}

func (ctr *TaskController) Store(c *fiber.Ctx) error {
	r, err := requests.NewStoreTaskRequest(c)

	if err != nil {
		return err
	}

	if err = r.Validate(); err != nil {
		return c.Render("common/errors/422", fiber.Map{})
	}

	db := database.NewConnection()
	defer db.CloseConnection()

	task, err := ctr.ts.Store(db, r.Title)

	if err != nil {
		log.Println(err)

		return c.Render("common/errors/500", fiber.Map{})
	}

	return c.Render("task/show", fiber.Map{
		"Task": task,
	})
}

func (ctr *TaskController) Delete(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")

	if err != nil {
		return c.Render("common/errors/404", fiber.Map{})
	}

	db := database.NewConnection()
	defer db.CloseConnection()

	if err := ctr.ts.Delete(db, id); err != nil {
		log.Println(err)

		return c.Render("common/errors/500", fiber.Map{})
	}

	return c.Render("common/empty", fiber.Map{})
}