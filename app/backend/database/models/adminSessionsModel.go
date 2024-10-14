package models

import "time"

type AdminSession struct {
	ID          uint      `gorm:"primaryKey"`
	AdminUserID uint      `gorm:"not null;index:admin_user_id_index"`
	Token       string    `gorm:"type:text;not null"`
	CreatedAt   time.Time `gorm:"default:CURRENT_TIMESTAMP"`
	UpdatedAt   time.Time `gorm:"default:CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"`
	AdminUser   AdminUser `gorm:"foreignKey:AdminUserID"`
}
