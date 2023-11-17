package bootstrap

import (
	"github.com/belekanych/sandbox/go/crud/services"
)

var TaskService services.TaskService

func LoadTaskService() {
	TaskService = services.TaskService{}
}