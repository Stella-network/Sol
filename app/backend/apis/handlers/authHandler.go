package handlers

import (
	"go_gin_gorm/repositories"
	"go_gin_gorm/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

/**
* ログイン処理APIのハンドラ
*
* @return {gin.HandlerFunc}
 */
type Credentials struct {
	UserName string `json:"userName"`
	Password string `json:"password"`
}

func LoginHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		var credentials Credentials
		if err := c.ShouldBindJSON(&credentials); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
			return
		}
		// ユーザー名とパスワードを検証する
		if !services.UserAuthinticate(credentials.UserName, credentials.Password) {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			return
		}
		// トークンを生成する
		tokenString, err := services.GenerateToken(credentials.UserName, false)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Error generating token"})
			return
		}
		// トークンをデータベースに保存する
		err = services.UpdateUserToken(credentials.UserName, tokenString)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Error saving token"})
			return
		}

		c.JSON(200, gin.H{
			"message": "login success",
			"token":   tokenString,
		})
	}
}

/**
 * ログアウト処理APIのハンドラ
 *
 * @return {gin.HandlerFunc}
 */
type Token struct {
	Token string `json:"token"`
}

func LogoutHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		var logout Token
		if err := c.ShouldBindJSON(&logout); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
			return
		}
		// トークンを削除する
		err := repositories.DeleteToken(logout.Token)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Error deleting token"})
			return
		}

		c.JSON(200, gin.H{
			"message": "logout success",
		})
	}
}

/**
 * ログインチェック処理APIのハンドラ
 *
 * @return {gin.HandlerFunc}
 */
func AuthCheckHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		var token Token
		if err := c.ShouldBindJSON(&token); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
			return
		}
		// トークンからユーザー情報を取得する
		user, err := repositories.GetUserByToken(token.Token)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Error getting user"})
			return
		}

		c.JSON(200, gin.H{
			"message": "user found",
			"user": gin.H{
				"id":    user.ID,
				"email": user.Email,
			},
		})
	}
}

/**
* 管理ユーザーログイン処理APIのハンドラ
*
* @return {gin.HandlerFunc}
 */
func AdminLoginHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		var credentials Credentials
		if err := c.ShouldBindJSON(&credentials); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
			return
		}
		// ユーザー名とパスワードを検証する
		if !services.AdminUserAuthinticate(credentials.UserName, credentials.Password) {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			return
		}
		// トークンを生成する
		tokenString, err := services.GenerateToken(credentials.UserName, true)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Error generating token"})
			return
		}
		// トークンをデータベースに保存する
		err = services.UpdateAdminUserToken(credentials.UserName, tokenString)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Error saving token"})
			return
		}

		c.JSON(200, gin.H{
			"message": "login success",
			"token":   tokenString,
		})
	}
}

/**
 * 管理ユーザーログアウト処理APIのハンドラ
 *
 * @return {gin.HandlerFunc}
 */
func AdminLogoutHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		var logout Token
		if err := c.ShouldBindJSON(&logout); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
			return
		}
		// トークンを削除する
		err := repositories.DeleteAdminToken(logout.Token)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Error deleting token"})
			return
		}

		c.JSON(200, gin.H{
			"message": "logout success",
		})
	}
}

/**
 * 管理ユーザーログインチェック処理APIのハンドラ
 *
 * @return {gin.HandlerFunc}
 */
func AdminAuthCheckHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		var token Token
		if err := c.ShouldBindJSON(&token); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
			return
		}
		// トークンからユーザー情報を取得する
		user, err := repositories.GetAdminUserByToken(token.Token)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Error getting user"})
			return
		}

		c.JSON(200, gin.H{
			"message": "user found",
			"user": gin.H{
				"id": user.ID,
			},
		})
	}
}
