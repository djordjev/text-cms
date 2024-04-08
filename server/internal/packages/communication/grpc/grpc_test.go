package grpc

import (
	"context"
	"errors"
	"github.com/djordjev/text-cms/server/internal/packages/utils"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"testing"
)

type mockApp struct {
	mock.Mock
}

func (m *mockApp) GetFileContent(ctx context.Context, request utils.Request) (utils.Response, error) {
	args := m.Called(ctx, request)
	return args.Get(0).(utils.Response), args.Error(1)
}

func TestGetText(t *testing.T) {
	ctx := context.TODO()

	type testCase struct {
		name string
		req  *TextRequest

		prepareMock func(mockApp *mockApp, tc *testCase)
		result      TextResponse
		error       string
	}

	table := []testCase{
		{
			name: "success",
			req:  &TextRequest{File: "/test.txt", Payload: `{"text": "Hello World"}`},
			prepareMock: func(mockApp *mockApp, tc *testCase) {
				request := utils.Request{Path: tc.req.File, Payload: map[string]any{"text": "Hello World"}}
				mockApp.On("GetFileContent", ctx, request).Return(utils.Response("response"), nil)
			},
			result: TextResponse{Payload: "response"},
		},
		{
			name: "failure",
			req:  &TextRequest{File: "/test.txt", Payload: `{"text": "Hello World"}`},
			prepareMock: func(mockApp *mockApp, tc *testCase) {
				mockApp.
					On("GetFileContent", ctx, mock.Anything).
					Return(utils.Response(""), errors.New("error"))
			},
			error: "error",
		},
	}

	for _, test := range table {
		t.Run(test.name, func(t *testing.T) {

			app := &mockApp{}
			test.prepareMock(app, &test)

			srv := Server{app: app}

			result, err := srv.GetText(ctx, test.req)

			require.Equal(t, *result, test.result)
			if test.error != "" {
				require.ErrorContains(t, err, test.error)
			} else {
				require.NoError(t, err)
			}
		})
	}
}
