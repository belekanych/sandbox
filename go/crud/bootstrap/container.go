package bootstrap

import (
	"github.com/belekanych/sandbox/go/crud/database"
	"github.com/belekanych/sandbox/go/crud/services"
	"github.com/golobby/container/v3"
)

func LoadIocContainer() {
	handlers := []interface{} {
		func() (database.DBInterface, error) {
			return database.NewConnection()
		},
		func() services.TaskServiceInterface {
			return services.NewTaskService()
		},
	}

	for _, handler := range handlers {
		err := container.Transient(handler)

		if err != nil {
			panic(err)
		}
	}
}