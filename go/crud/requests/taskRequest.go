package requests

import (
	"errors"

	"github.com/gofiber/fiber/v2"
)

type StoreTaskRequest struct {
	Title string `form:"title"`
}

func NewStoreTaskRequest(c *fiber.Ctx) (*StoreTaskRequest, error) {
	r := new(StoreTaskRequest)

	if err := c.BodyParser(r); err != nil {
		return nil, err
	}

	return r, nil
}

func (r *StoreTaskRequest) Validate() error {
	if r.Title == "" {
		return errors.New("Title cannot be empty")
	}

	if len(r.Title) > 45 {
		return errors.New("Title cannot be longer than 45 symbols")
	}

	return nil
}