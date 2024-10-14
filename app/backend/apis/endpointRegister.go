package apis

import (
	"github.com/gin-gonic/gin"
)

type EndpointType struct {
	Method  string
	Group   string
	Path    string
	Handler gin.HandlerFunc
}

type EndpointRegisterType struct {
	Endpoints []EndpointType
	Registry  *gin.Engine
}

type EndpointRegisterInterfaceType interface {
	EndpointRegister(endpoint EndpointType)
	EndpointsRegister(endpoints []EndpointType)
	Initialize()
	Run()
}

func (endpointRegister *EndpointRegisterType) EndpointRegister(endpoint EndpointType) {
	endpointRegister.Endpoints = append(endpointRegister.Endpoints, endpoint)
}

func (endpointRegister *EndpointRegisterType) EndpointsRegister(endpoints []EndpointType) {
	for _, endpoint := range endpoints {
		endpointRegister.EndpointRegister(endpoint)
	}
}

/**
 * エンドポイントを初期化する
 */
func (endpointRegister *EndpointRegisterType) Initialize() {
	for _, endpoint := range endpointRegister.Endpoints {
		switch endpoint.Method {
		case "GET":
			if endpoint.Group != "" {
				endpointRegister.Registry.Group(endpoint.Group).GET(endpoint.Path, endpoint.Handler)
			} else {
				endpointRegister.Registry.GET(endpoint.Path, endpoint.Handler)
			}
		case "POST":
			if endpoint.Group != "" {
				endpointRegister.Registry.Group(endpoint.Group).POST(endpoint.Path, endpoint.Handler)
			} else {
				endpointRegister.Registry.POST(endpoint.Path, endpoint.Handler)
			}
		case "PUT":
			if endpoint.Group != "" {
				endpointRegister.Registry.Group(endpoint.Group).PUT(endpoint.Path, endpoint.Handler)
			} else {
				endpointRegister.Registry.PUT(endpoint.Path, endpoint.Handler)
			}
		case "DELETE":
			if endpoint.Group != "" {
				endpointRegister.Registry.Group(endpoint.Group).DELETE(endpoint.Path, endpoint.Handler)
			} else {
				endpointRegister.Registry.DELETE(endpoint.Path, endpoint.Handler)
			}
		case "PATCH":
			if endpoint.Group != "" {
				endpointRegister.Registry.Group(endpoint.Group).PATCH(endpoint.Path, endpoint.Handler)
			} else {
				endpointRegister.Registry.PATCH(endpoint.Path, endpoint.Handler)
			}
		default:
			panic("Invalid method" + endpoint.Method)
		}
	}
}

func (endpointRegister *EndpointRegisterType) Run() {
	endpointRegister.Initialize()
	endpointRegister.Registry.Run(":8080")
}

func New(registry *gin.Engine) EndpointRegisterInterfaceType {
	return &EndpointRegisterType{
		Endpoints: []EndpointType{},
		Registry:  registry,
	}
}
