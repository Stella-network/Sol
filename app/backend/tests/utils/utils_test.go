package tests

import (
	"fmt"
	"go_gin_gorm/utils"
	"testing"

	"golang.org/x/crypto/bcrypt"
)

// HashPasswordのテスト
func TestHashPassword(t *testing.T) {
	password := "testPassword123"
	hashedPassword, err := utils.HashPassword(password)
	if err != nil {
		t.Errorf("HashPassword failed: %v", err)
	}
	// bcryptのハッシュは毎回異なるため、エラーがないかのみをチェック
	if len(hashedPassword) == 0 {
		t.Errorf("Hashed password is empty")
	}
}

// CheckPasswordHashのテスト
func TestCheckPasswordHash(t *testing.T) {
	password := "testPassword123"
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		t.Fatalf("bcrypt.GenerateFromPassword failed: %v", err)
	}

	// 正しいパスワード
	if !utils.CheckPasswordHash(password, string(hashedPassword)) {
		t.Errorf("CheckPasswordHash was incorrect, got: false, want: true.")
	}
	fmt.Printf("t: %v\n", string(hashedPassword))

	// 間違ったパスワード
	if utils.CheckPasswordHash("wrongPassword", string(hashedPassword)) {
		t.Errorf("CheckPasswordHash was incorrect, got: true, want: false.")
	}
}
