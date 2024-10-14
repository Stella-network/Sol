package endpoints

import (
	"go_gin_gorm/apis"
	"go_gin_gorm/apis/handlers"
)

func LoginEndpoint() []apis.EndpointType {
	endpoints := []apis.EndpointType{}
	endpoints = append(endpoints, apis.EndpointType{
		Method:  "POST",
		Group:   "/auth",
		Path:    "/login",
		Handler: handlers.LoginHandler(),
	},
	)
	return endpoints
}

func LogoutEndpoint() []apis.EndpointType {
	endpoints := []apis.EndpointType{}
	endpoints = append(endpoints, apis.EndpointType{
		Method:  "POST",
		Group:   "/auth",
		Path:    "/logout",
		Handler: handlers.LogoutHandler(),
	},
	)
	return endpoints
}

func AuthCheckEndpoint() []apis.EndpointType {
	endpoints := []apis.EndpointType{}
	endpoints = append(endpoints, apis.EndpointType{
		Method:  "POST",
		Group:   "/auth",
		Path:    "/check",
		Handler: handlers.AuthCheckHandler(),
	},
	)
	return endpoints
}

func AdminLoginEndpoint() []apis.EndpointType {
	endpoints := []apis.EndpointType{}
	endpoints = append(endpoints, apis.EndpointType{
		Method:  "POST",
		Group:   "/auth",
		Path:    "/admin/login",
		Handler: handlers.AdminLoginHandler(),
	},
	)
	return endpoints
}

func AdminLogoutEndpoint() []apis.EndpointType {
	endpoints := []apis.EndpointType{}
	endpoints = append(endpoints, apis.EndpointType{
		Method:  "POST",
		Group:   "/auth",
		Path:    "/admin/logout",
		Handler: handlers.AdminLogoutHandler(),
	},
	)
	return endpoints
}

func AdminAuthCheckEndpoint() []apis.EndpointType {
	endpoints := []apis.EndpointType{}
	endpoints = append(endpoints, apis.EndpointType{
		Method:  "POST",
		Group:   "/auth",
		Path:    "/admin/check",
		Handler: handlers.AdminAuthCheckHandler(),
	},
	)
	return endpoints
}
