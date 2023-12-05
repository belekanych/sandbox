package services

import (
	"database/sql"
	"log"

	"github.com/belekanych/sandbox/go/crud/models"
)

type TaskService struct {
	items []string
	db *sql.DB
}

func CreateNewTaskService() *TaskService {
	log.Println("Task service created")

	db, err := sql.Open("mysql", "root:password@tcp(mysql:3306)/sandbox_go_crud")

	if err != nil {
		panic(err)
	}

	return &TaskService{ db: db }
}

func (t *TaskService) Index() []string {
	results, err := t.db.Query("SELECT * FROM tasks")
	if err != nil {
		panic(err)
	}

	var tasks []*models.Task
	for results.Next() {
		var task models.Task

		err = results.Scan(&task.Id, &task.Title)

		if err != nil {
			panic(err)
		}

		tasks = append(tasks, &task)
	}

	var strings []string
	for _, task := range tasks {
		strings = append(strings, task.Title)
	}
	return strings
}

func (t *TaskService) Store(task string) {
	t.items = append(t.items, task)
}

func (t *TaskService) Delete(index int) {
	tasks := []string{}

	for i, task := range t.items {
		if i != index {
			tasks = append(tasks, task)
		}
	}

	t.items = tasks
}