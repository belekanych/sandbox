package database

import (
	"fmt"
	"os"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type DBInterface interface {
	Find(dest interface{}, conds ...interface{}) *gorm.DB
	First(dest interface{}, conds ...interface{}) *gorm.DB
	Create(value interface{}) *gorm.DB
	Delete(value interface{}, conds ...interface{}) *gorm.DB
}

type DB struct {
	Conn *gorm.DB
}

func NewConnection() (*DB, error) {
	conn, err := gorm.Open(
		mysql.Open(
			fmt.Sprintf(
				"%s:%s@%s/%s",
				os.Getenv("DB_USER"),
				os.Getenv("DB_PASSWORD"),
				os.Getenv("DB_CONNECTION"),
				os.Getenv("DB_DATABASE"),
			),
		),
		&gorm.Config{},
	)

	if err != nil {
		return nil, err
	}

	return &DB{ Conn: conn }, nil
}

func (db *DB) Find(dest interface{}, conds ...interface{}) *gorm.DB {
	return db.Conn.Find(dest, conds...)
}

func (db *DB) First(dest interface{}, conds ...interface{}) *gorm.DB {
	return db.Conn.First(dest, conds...)
}

func (db *DB) Create(value interface{}) *gorm.DB {
	return db.Conn.Create(value)
}

func (db *DB) Delete(value interface{}, conds ...interface{}) *gorm.DB {
	return db.Conn.Delete(value, conds...)
}