package services

import (
	"go_gin_gorm/database/models"
	"go_gin_gorm/repositories"
	"go_gin_gorm/utils"
	"time"

	"github.com/dgrijalva/jwt-go"
)

/**
 * ユーザー名とパスワードを検証する
 *
 * @param {string} ユーザー名
 * @param {string} パスワード
 * @return {bool} 検証結果
 */
func UserAuthinticate(userName string, password string) bool {
	user, err := repositories.GetUserByName(userName)
	if err != nil {
		return false
	}
	// パスワードが一致するか確認
	if !utils.CheckPasswordHash(password, user.Password) {
		return false
	}

	return true
}

/**
 * ユーザーのトークンを作成or更新する
 *
 * @param {string} ユーザー名
 * @param {string} トークン
 * @return {error}
 */
func UpdateUserToken(userName string, token string) error {
	user, err := repositories.GetUserByName(userName)
	if err != nil {
		return err
	}
	session, err := repositories.GetSessionByUserID(user.ID)
	//セッションが存在しない場合は新規作成
	if err != nil {
		session = models.Session{
			UserID: user.ID,
			Token:  token,
		}
		err = repositories.CreateSession(session)
		if err != nil {
			return err
		}
	} else {
		//セッションが存在する場合はトークンを更新
		session.Token = token
		err = repositories.UpdateSession(session)
		if err != nil {
			return err
		}
	}

	return nil
}

/**
 * JWTトークンを生成する
 *
 * @param {string} ユーザー名
 * @param {bool} 管理者用トークンかどうか
 * @return {string} トークン
 * @return {error}
 */
type Claims struct {
	UserName string `json:"userName"`
	jwt.StandardClaims
}

func GenerateToken(userName string, isAdminToken bool) (string, error) {
	expirationTime := time.Now().Add(5 * time.Minute)
	claims := &Claims{
		UserName: userName,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}
	envKey := "JWT_SECRET"
	if isAdminToken {
		envKey = "JWT_SECRET_ADMIN"
	}
	jwtKeyString, err := utils.GetEnv(envKey)
	if err != nil {
		return "", err
	}
	jwtKey := []byte(jwtKeyString)
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		return "", err
	}

	return tokenString, err
}

/**
 * 管理用ユーザー名とパスワードを検証する
 *
 * @param {string} ユーザー名
 * @param {string} パスワード
 * @return {bool} 検証結果
 */
func AdminUserAuthinticate(userName string, password string) bool {
	user, err := repositories.GetAdminUserByName(userName)
	if err != nil {
		return false
	}
	// パスワードが一致するか確認
	if !utils.CheckPasswordHash(password, user.Password) {
		return false
	}

	return true
}

/**
 * ユーザーのトークンを作成or更新する
 *
 * @param {string} ユーザー名
 * @param {string} トークン
 * @return {error}
 */
func UpdateAdminUserToken(userName string, token string) error {
	user, err := repositories.GetAdminUserByName(userName)
	if err != nil {
		return err
	}
	session, err := repositories.GetAdminSessionByUserID(user.ID)
	//セッションが存在しない場合は新規作成
	if err != nil {
		session = models.AdminSession{
			AdminUserID: user.ID,
			Token:       token,
		}
		err = repositories.CreateAdminSession(session)
		if err != nil {
			return err
		}
	} else {
		//セッションが存在する場合はトークンを更新
		session.Token = token
		err = repositories.UpdateAdminSession(session)
		if err != nil {
			return err
		}
	}

	return nil
}
