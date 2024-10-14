package database

import (
	"fmt"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var db *gorm.DB

/**
 * データベースを初期化する
 *
 * @param string setting
 * @return error
 */
func InitializeDb(setting string) (err error) {
	db, err = gorm.Open(mysql.Open(setting), &gorm.Config{})
	if err != nil {
		return fmt.Errorf("failed to connect database: %v", err)
	}

	return nil
}

/**
 * Dockerコンテナ上のデータベースと接続する
 *
 * @return error
 */
func InitializeDbDocker() (err error) {
	setting := "root:password@tcp(sol_db:3306)/sol_schema?charset=utf8mb4&parseTime=True&loc=Local"
	return InitializeDb(setting)
}

/**
 * データベース設定を取得する
 *
 * @return *gorm.DB
 */
func GetDB() *gorm.DB {
	return db
}
