package services

import "log"

type TaskService struct {
	items []string
}

func CreateNewTaskService() *TaskService {
	log.Println("Task service created")

	return &TaskService{}
}

func (t *TaskService) Index() []string {
	return t.items
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