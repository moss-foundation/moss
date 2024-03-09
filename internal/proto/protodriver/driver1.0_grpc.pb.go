// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.3.0
// - protoc             v4.25.3
// source: protodriver/driver1.0.proto

package protodriver

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

const (
	Driver_DescribeSchema_FullMethodName = "/protodriver.Driver/DescribeSchema"
	Driver_Stop_FullMethodName           = "/protodriver.Driver/Stop"
)

// DriverClient is the client API for Driver service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type DriverClient interface {
	DescribeSchema(ctx context.Context, in *DescribeSchema_Request, opts ...grpc.CallOption) (*DescribeSchema_Response, error)
	Stop(ctx context.Context, in *Stop_Request, opts ...grpc.CallOption) (*Stop_Response, error)
}

type driverClient struct {
	cc grpc.ClientConnInterface
}

func NewDriverClient(cc grpc.ClientConnInterface) DriverClient {
	return &driverClient{cc}
}

func (c *driverClient) DescribeSchema(ctx context.Context, in *DescribeSchema_Request, opts ...grpc.CallOption) (*DescribeSchema_Response, error) {
	out := new(DescribeSchema_Response)
	err := c.cc.Invoke(ctx, Driver_DescribeSchema_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *driverClient) Stop(ctx context.Context, in *Stop_Request, opts ...grpc.CallOption) (*Stop_Response, error) {
	out := new(Stop_Response)
	err := c.cc.Invoke(ctx, Driver_Stop_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// DriverServer is the server API for Driver service.
// All implementations must embed UnimplementedDriverServer
// for forward compatibility
type DriverServer interface {
	DescribeSchema(context.Context, *DescribeSchema_Request) (*DescribeSchema_Response, error)
	Stop(context.Context, *Stop_Request) (*Stop_Response, error)
	mustEmbedUnimplementedDriverServer()
}

// UnimplementedDriverServer must be embedded to have forward compatible implementations.
type UnimplementedDriverServer struct {
}

func (UnimplementedDriverServer) DescribeSchema(context.Context, *DescribeSchema_Request) (*DescribeSchema_Response, error) {
	return nil, status.Errorf(codes.Unimplemented, "method DescribeSchema not implemented")
}
func (UnimplementedDriverServer) Stop(context.Context, *Stop_Request) (*Stop_Response, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Stop not implemented")
}
func (UnimplementedDriverServer) mustEmbedUnimplementedDriverServer() {}

// UnsafeDriverServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to DriverServer will
// result in compilation errors.
type UnsafeDriverServer interface {
	mustEmbedUnimplementedDriverServer()
}

func RegisterDriverServer(s grpc.ServiceRegistrar, srv DriverServer) {
	s.RegisterService(&Driver_ServiceDesc, srv)
}

func _Driver_DescribeSchema_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(DescribeSchema_Request)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(DriverServer).DescribeSchema(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: Driver_DescribeSchema_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(DriverServer).DescribeSchema(ctx, req.(*DescribeSchema_Request))
	}
	return interceptor(ctx, in, info, handler)
}

func _Driver_Stop_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(Stop_Request)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(DriverServer).Stop(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: Driver_Stop_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(DriverServer).Stop(ctx, req.(*Stop_Request))
	}
	return interceptor(ctx, in, info, handler)
}

// Driver_ServiceDesc is the grpc.ServiceDesc for Driver service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var Driver_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "protodriver.Driver",
	HandlerType: (*DriverServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "DescribeSchema",
			Handler:    _Driver_DescribeSchema_Handler,
		},
		{
			MethodName: "Stop",
			Handler:    _Driver_Stop_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "protodriver/driver1.0.proto",
}
