package services

import (
	"github.com/belekanych/sandbox/go/crud/database"
	"github.com/belekanych/sandbox/go/crud/models"
)

type TaskService struct {}

func NewTaskService() *TaskService {
	return &TaskService{}
}

func (t *TaskService) Index(db *database.DB) ([]*models.Task, error) {
	results, err := db.Conn.Query("SELECT * FROM tasks")
	if err != nil {
		return nil, err
	}

	var tasks []*models.Task
	for results.Next() {
		var task models.Task

		if err := results.Scan(&task.Id, &task.Title); err != nil {
			return nil, err
		}

		tasks = append(tasks, &task)
	}

	return tasks, nil
}

func (t *TaskService) Store(db *database.DB, title string) (*models.Task, error) {
	results, err := db.Conn.Exec("INSERT INTO tasks (title) VALUES(?)", title)

	if err != nil {
		return nil, err
	}

	id, err := results.LastInsertId()
	if err != nil {
		return nil, err
	}

	return t.Get(db, id)
}

func (t *TaskService) Get(db *database.DB, id int64) (*models.Task, error) {
	results := db.Conn.QueryRow("SELECT id, title FROM tasks WHERE id = ?", id)

	var task models.Task

	if err := results.Scan(&task.Id, &task.Title); err != nil {
		return nil, err
	}

	return &task, nil
}

func (t *TaskService) Delete(db *database.DB, id int) error {
	_, err := db.Conn.Query("DELETE FROM tasks WHERE id = ?", id)

	return err
}