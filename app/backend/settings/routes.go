package settings

import (
	"go_gin_gorm/apis"
	"go_gin_gorm/apis/endpoints"

	"github.com/gin-gonic/gin"
)

func InitializeRoutes(engine *gin.Engine) apis.EndpointRegisterInterfaceType {
	registry := apis.New(engine)

	//ここにエンドポイントを追加する
	registry.EndpointsRegister(endpoints.SampleEndpoint())
	registry.EndpointsRegister(endpoints.LoginEndpoint())
	registry.EndpointsRegister(endpoints.LogoutEndpoint())
	registry.EndpointsRegister(endpoints.AuthCheckEndpoint())
	registry.EndpointsRegister(endpoints.AdminLoginEndpoint())
	registry.EndpointsRegister(endpoints.AdminLogoutEndpoint())
	registry.EndpointsRegister(endpoints.AdminAuthCheckEndpoint())
	return registry
}
