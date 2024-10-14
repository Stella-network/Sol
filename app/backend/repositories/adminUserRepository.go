package repositories

import (
	"go_gin_gorm/database"
	"go_gin_gorm/database/models"
)

/**
 * ユーザー名から管理ユーザー情報を取得する
 *
 * @param {string} ユーザー名
 * @return {models.AdminUser} ユーザー情報
 * @return {error}
 */
func GetAdminUserByName(userName string) (models.AdminUser, error) {
	user := models.AdminUser{}
	err := database.GetDB().
		Model(models.AdminUser{}).
		Where("user_name = ?", userName).
		First(&user).Error
	if err != nil {

		return user, err
	}

	return user, nil
}
