package services

import (
	"database/sql"
	"log"

	"github.com/belekanych/sandbox/go/crud/models"
)

type TaskService struct {
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

func (t *TaskService) Index() []*models.Task {
	results, err := t.db.Query("SELECT * FROM tasks")
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

func (t *TaskService) Store(task string) error {
	_, err := t.db.Query("INSERT INTO tasks (title) VALUES(?)", task)

	return err
}

func (t *TaskService) Delete(id int) error {
	_, err := t.db.Query("DELETE FROM tasks WHERE id = ?", id)

	return err
}