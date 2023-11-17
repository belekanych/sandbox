package services

type TaskService struct {
	items []string
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