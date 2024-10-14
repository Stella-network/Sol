package utils

import (
	"os"

	"golang.org/x/crypto/bcrypt"

	"github.com/joho/godotenv"
)

/**
 * 環境変数を取得する
 *
 * @param key string
 * @return string
 * @return error
 */
func GetEnv(key string) (envValue string, err error) {
	err = godotenv.Load("/app/settings/.env")
	if err != nil {
		return "", err
	}
	envValue = os.Getenv(key)

	return envValue, err
}

/**
 * パスワードをハッシュ化する
 *
 * @param {string} パスワード
 * @return {string} ハッシュ化されたパスワード
 * @return {error}
 */
func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

/**
 * パスワードのハッシュを検証する
 *
 * @param {string} パスワード
 * @param {string} ハッシュ化されたパスワード
 * @return {bool} 検証結果
 */
func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}
