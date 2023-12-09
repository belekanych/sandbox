package services

import (
	"github.com/belekanych/sandbox/go/crud/database"
	"github.com/belekanych/sandbox/go/crud/models"
)

type TaskService struct {}

func NewTaskService() *TaskService {
	return &TaskService{}
}

func (t *TaskService) Index(db *database.DB) []*models.Task {
	results, err := db.Conn.Query("SELECT * FROM tasks")
	if err != nil {
		panic(err)
	}

	var tasks []*models.Task
	for results.Next() {
		var task models.Task

		if err := results.Scan(&task.Id, &task.Title); err != nil {
			panic(err)
		}

		tasks = append(tasks, &task)
	}

	return tasks
}

func (t *TaskService) Store(db *database.DB, task string) error {
	_, err := db.Conn.Query("INSERT INTO tasks (title) VALUES(?)", task)

	return err
}

func (t *TaskService) Delete(db *database.DB, id int) error {
	_, err := db.Conn.Query("DELETE FROM tasks WHERE id = ?", id)

	return err
}