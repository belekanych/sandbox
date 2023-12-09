package database

import (
	"database/sql"
	"fmt"
	"os"
)

type DB struct {
	Conn *sql.DB
}

func NewConnection() (*DB, error) {
	conn, err := sql.Open(
		os.Getenv("DB_DRIVER"),
		fmt.Sprintf(
			"%s:%s@%s/%s",
			os.Getenv("DB_USER"),
			os.Getenv("DB_PASSWORD"),
			os.Getenv("DB_CONNECTION"),
			os.Getenv("DB_DATABASE"),
		),
	)

	if err != nil {
		return nil, err
	}

	return &DB{ Conn: conn }, nil
}

func (db *DB) CloseConnection() {
	db.Conn.Close()
}