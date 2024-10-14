package repositories

import (
	"go_gin_gorm/database"
	"go_gin_gorm/database/models"
)

/**
 * ユーザーIDから管理ユーザーのセッション情報を取得する
 *
 * @param {uint} ユーザーID
 * @return {models.Session} セッション情報
 * @return {error}
 */
func GetAdminSessionByUserID(userID uint) (models.AdminSession, error) {
	session := models.AdminSession{}
	// ユーザーIDが存在するか確認
	err := database.GetDB().
		Where("user_id = ?", userID).
		First(&session).Error
	if err != nil {
		return session, err
	}

	return session, nil
}

/**
 * トークンから管理ユーザー情報を取得する
 *
 * @param {string} トークン
 * @return {models.User} ユーザー情報
 * @return {error}
 */
func GetAdminUserByToken(token string) (models.AdminUser, error) {
	session := models.AdminSession{}
	err := database.GetDB().
		Preload("AdminUser").
		Where("token = ?", token).
		First(&session).Error
	if err != nil {
		return models.AdminUser{}, err
	}

	return session.AdminUser, nil
}

/**
 * セッション情報を作成する
 *
 * @param {models.Session} セッション情報
 * @return {error}
 */
func CreateAdminSession(session models.AdminSession) error {
	err := database.GetDB().
		Create(&session).Error
	if err != nil {
		return err
	}

	return nil
}

/**
 * 管理ユーザー用セッションのトークンを更新する
 *
 * @param {models.Session} セッション情報
 * @return {error}
 */
func UpdateAdminSession(session models.AdminSession) error {
	err := database.GetDB().
		Save(&session).Error
	if err != nil {
		return err
	}

	return nil
}

/**
 * 管理ユーザー用トークンを削除する
 *
 * @param {string} トークン
 * @return {error}
 */
func DeleteAdminToken(token string) error {
	err := database.GetDB().
		Where("token = ?", token).
		Delete(models.AdminSession{}).Error
	if err != nil {
		return err
	}

	return nil
}
