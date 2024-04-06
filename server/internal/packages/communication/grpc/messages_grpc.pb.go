// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.2.0
// - protoc             v3.20.3
// source: messages.proto

package grpc

import (
	grpc "google.golang.org/grpc"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

// TextServiceClient is the client API for TextService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type TextServiceClient interface {
}

type textServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewTextServiceClient(cc grpc.ClientConnInterface) TextServiceClient {
	return &textServiceClient{cc}
}

// TextServiceServer is the server API for TextService service.
// All implementations must embed UnimplementedTextServiceServer
// for forward compatibility
type TextServiceServer interface {
	mustEmbedUnimplementedTextServiceServer()
}

// UnimplementedTextServiceServer must be embedded to have forward compatible implementations.
type UnimplementedTextServiceServer struct {
}

func (UnimplementedTextServiceServer) mustEmbedUnimplementedTextServiceServer() {}

// UnsafeTextServiceServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to TextServiceServer will
// result in compilation errors.
type UnsafeTextServiceServer interface {
	mustEmbedUnimplementedTextServiceServer()
}

func RegisterTextServiceServer(s grpc.ServiceRegistrar, srv TextServiceServer) {
	s.RegisterService(&TextService_ServiceDesc, srv)
}

// TextService_ServiceDesc is the grpc.ServiceDesc for TextService service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var TextService_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "message.TextService",
	HandlerType: (*TextServiceServer)(nil),
	Methods:     []grpc.MethodDesc{},
	Streams:     []grpc.StreamDesc{},
	Metadata:    "messages.proto",
}
