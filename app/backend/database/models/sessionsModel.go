package models

import "time"

type Session struct {
	ID        uint      `gorm:"primaryKey"`                   // unsigned intとしてIDを定義
	UserID    uint      `gorm:"not null;index:user_id_index"` // UserテーブルのIDを外部キーとして使用
	Token     string    `gorm:"type:text;not null"`
	CreatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP"`
	UpdatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"`
	User      User      `gorm:"foreignKey:UserID"` // Userへの外部キー参照
}
