package repositories

import (
	"go_gin_gorm/database"
	"go_gin_gorm/database/models"
	"strings"
)

/**
 * ユーザー名からユーザー情報を取得する
 *
 * @param {string} ユーザー名
 * @return {models.User} ユーザー情報
 * @return {error}
 */
func GetUserByName(userName string) (models.User, error) {
	user := models.User{}
	// ユーザー名が存在するか確認
	query := database.GetDB().
		Model(models.User{})
	// ユーザー名に＠が含まれているか確認
	if strings.Contains(userName, "@") {
		query = query.Where("email = ?", userName)
	} else {
		query = query.Where("user_name = ?", userName)
	}
	err := query.First(&user).Error
	if err != nil {

		return user, err
	}

	return user, nil
}
