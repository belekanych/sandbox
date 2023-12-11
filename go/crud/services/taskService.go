package services

import (
	"github.com/belekanych/sandbox/go/crud/database"
	"github.com/belekanych/sandbox/go/crud/models"
	"github.com/golobby/container/v3"
)

type TaskServiceInterface interface {
	Index() ([]*models.Task, error)
	Store(title string) (*models.Task, error)
	Get(id int) (*models.Task, error)
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

	var tasks []*models.Task
    result := db.Find(&tasks)

	return tasks, result.Error
}

func (t *TaskService) Store(title string) (*models.Task, error) {
	db, err := t.getDatabase()

	if err != nil {
		return nil, err
	}

	task := models.Task{ Title: title }

	result := db.Create(&task)

	return &task, result.Error
}

func (t *TaskService) Get(id int) (*models.Task, error) {
	db, err := t.getDatabase()

	if err != nil {
		return nil, err
	}

	task := models.Task{ Id: id }
	result := db.First(&task)

	return &task, result.Error
}

func (t *TaskService) Delete(id int) error {
	db, err := t.getDatabase()

	if err != nil {
		return err
	}

	result := db.Delete(&models.Task{}, id)

	return result.Error
}

func (t *TaskService) getDatabase() (database.DBInterface, error) {
	var db database.DBInterface
	err := container.Resolve(&db)

	return db, err
}