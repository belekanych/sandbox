package controllers

import (
	"log"

	"github.com/belekanych/sandbox/go/crud/requests"
	"github.com/belekanych/sandbox/go/crud/services"
	"github.com/gofiber/fiber/v2"
	"github.com/golobby/container/v3"
)

type TaskController struct {
	ts services.TaskServiceInterface
}

func NewTaskController(ts services.TaskServiceInterface) *TaskController {
	return &TaskController{ts: ts}
}

func SetupTaskController(app *fiber.App) error {
	var ts services.TaskServiceInterface
	err := container.Resolve(&ts)

	if err != nil {
		return err
	}

	taskController := NewTaskController(ts)

    tasks := app.Group("/tasks")
	tasks.Get("/", taskController.Index)
    tasks.Post("/", taskController.Store)
    tasks.Delete("/:id", taskController.Delete)

	return nil
}

func (ctr *TaskController) Index(c *fiber.Ctx) error {
	tasks, err := ctr.ts.Index()

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

	task, err := ctr.ts.Store(r.Title)

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

	if err := ctr.ts.Delete(id); err != nil {
		log.Println(err)

		return c.Render("common/errors/500", fiber.Map{})
	}

	return c.Render("common/empty", fiber.Map{})
}