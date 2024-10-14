package main

import (
	"fmt"
	"go_gin_gorm/database"
	"go_gin_gorm/settings"
	"go_gin_gorm/utils"

	"github.com/gin-gonic/gin"
)

func main() {
	// データベースを初期化する
	err := database.InitializeDbDocker()
	if err != nil {
		fmt.Print(err)
		return
	}
	engine := gin.Default()
	environment, err := utils.GetEnv("ENV_NAME")
	if err != nil {
		fmt.Print(err)
		return
	}
	if environment == "prod" {
		settings.SettingProd(engine)
	} else {
		settings.SettingDev(engine)
	}
	registry := settings.InitializeRoutes(engine)
	registry.Run()
}
