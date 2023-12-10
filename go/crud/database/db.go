package database

import (
	"database/sql"
	"fmt"
	"os"
)

type DBInterface interface {
	CloseConnection()
	Query(query string, args ...any) (*sql.Rows, error)
	QueryRow(query string, args ...any) *sql.Row
	Exec(query string, args ...any) (sql.Result, error)
}

type DB struct {
	conn *sql.DB
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

	return &DB{ conn: conn }, nil
}

func (db *DB) Query(query string, args ...any) (*sql.Rows, error) {
	return db.conn.Query(query, args...)
}

func (db *DB) QueryRow(query string, args ...any) *sql.Row {
	return db.conn.QueryRow(query, args...)
}

func (db *DB) Exec(query string, args ...any) (sql.Result, error) {
	return db.conn.Exec(query, args...)
}

func (db *DB) CloseConnection() {
	db.conn.Close()
}