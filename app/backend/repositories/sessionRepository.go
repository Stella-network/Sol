package repositories

import (
	"go_gin_gorm/database"
	"go_gin_gorm/database/models"
)

/**
 * ユーザーIDからセッション情報を取得する
 *
 * @param {uint} ユーザーID
 * @return {models.Session} セッション情報
 * @return {error}
 */
func GetSessionByUserID(userID uint) (models.Session, error) {
	session := models.Session{}
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
 * トークンからユーザー情報を取得する
 *
 * @param {string} トークン
 * @return {models.User} ユーザー情報
 * @return {error}
 */
func GetUserByToken(token string) (models.User, error) {
	session := models.Session{}
	err := database.GetDB().
		Preload("User").
		Where("token = ?", token).
		First(&session).Error
	if err != nil {
		return models.User{}, err
	}

	return session.User, nil
}

/**
 * セッション情報を作成する
 *
 * @param {models.Session} セッション情報
 * @return {error}
 */
func CreateSession(session models.Session) error {
	err := database.GetDB().
		Create(&session).Error
	if err != nil {
		return err
	}

	return nil
}

/**
 * セッションのトークンを更新する
 *
 * @param {models.Session} セッション情報
 * @return {error}
 */
func UpdateSession(session models.Session) error {
	err := database.GetDB().
		Save(&session).Error
	if err != nil {
		return err
	}

	return nil
}

/**
 * トークンを削除する
 *
 * @param {string} トークン
 * @return {error}
 */
func DeleteToken(token string) error {
	err := database.GetDB().
		Where("token = ?", token).
		Delete(models.Session{}).Error
	if err != nil {
		return err
	}

	return nil
}
