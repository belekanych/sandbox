package database

import "database/sql"

type DB struct {
	Conn *sql.DB
}

func NewConnection() *DB {
	conn, err := sql.Open("mysql", "root:password@tcp(mysql:3306)/sandbox_go_crud")

	if err != nil {
		panic(err)
	}

	return &DB{ Conn: conn }
}

func (db *DB) CloseConnection() {
	db.Conn.Close()
}