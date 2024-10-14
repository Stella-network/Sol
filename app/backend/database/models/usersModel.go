package models

import "time"

type User struct {
	ID        uint      `gorm:"primaryKey"`
	UserName  string    `gorm:"size:80;not null"`
	Password  string    `gorm:"size:80;not null"`
	Email     string    `gorm:"size:80;not null"`
	CreatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP"`
	UpdatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP"`
}
