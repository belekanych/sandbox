package services

import (
	"github.com/belekanych/sandbox/go/crud/database"
	"github.com/belekanych/sandbox/go/crud/models"
	"github.com/golobby/container/v3"
)

type TaskServiceInterface interface {
	Index() ([]*models.Task, error)
	Store(title string) (*models.Task, error)
	Get(id int64) (*models.Task, error)
	Delete(id int) error
}

type TaskService struct {}

func NewTaskService() *TaskService {
	return &TaskService{}
}

func (t *TaskService) Index() ([]*models.Task, error) {
	db, err := t.getDatabase()

	if err != nil {
		return nil, err
	}

	defer db.CloseConnection()

	results, err := db.Query("SELECT * FROM tasks")
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

func (t *TaskService) Store(title string) (*models.Task, error) {
	db, err := t.getDatabase()

	if err != nil {
		return nil, err
	}

	defer db.CloseConnection()

	results, err := db.Exec("INSERT INTO tasks (title) VALUES(?)", title)

	if err != nil {
		return nil, err
	}

	id, err := results.LastInsertId()
	if err != nil {
		return nil, err
	}

	return t.Get(id)
}

func (t *TaskService) Get(id int64) (*models.Task, error) {
	db, err := t.getDatabase()

	if err != nil {
		return nil, err
	}

	defer db.CloseConnection()

	results := db.QueryRow("SELECT id, title FROM tasks WHERE id = ?", id)

	var task models.Task

	if err := results.Scan(&task.Id, &task.Title); err != nil {
		return nil, err
	}

	return &task, nil
}

func (t *TaskService) Delete(id int) error {
	db, err := t.getDatabase()

	if err != nil {
		return err
	}

	defer db.CloseConnection()

	_, err = db.Query("DELETE FROM tasks WHERE id = ?", id)

	return err
}

func (t *TaskService) getDatabase() (database.DBInterface, error) {
	var db database.DBInterface
	err := container.Resolve(&db)

	return db, err
}