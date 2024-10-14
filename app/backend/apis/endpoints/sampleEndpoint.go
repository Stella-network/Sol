package endpoints

import (
	"go_gin_gorm/apis"
	"go_gin_gorm/apis/handlers"
)

func SampleEndpoint() []apis.EndpointType {
	endpoints := []apis.EndpointType{}
	endpoints = append(endpoints, apis.EndpointType{
		Method:  "GET",
		Path:    "/sample",
		Handler: handlers.SampleHandler(),
	},
	)
	return endpoints
}
