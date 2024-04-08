package resolvers

import (
	"context"
	"encoding/json"
	"errors"
	"github.com/djordjev/text-cms/server/internal/packages/communication/graphql/model"
	"github.com/djordjev/text-cms/server/internal/packages/utils"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"testing"
)

func TestPing(t *testing.T) {
	resolver := &queryResolver{}

	res, err := resolver.Ping(context.Background())

	require.Equal(t, res, "pong")
	require.Nil(t, err)
}

type mockApp struct {
	mock.Mock
}

func (m mockApp) GetFileContent(ctx context.Context, request utils.Request) (response utils.Response, err error) {
	args := m.Called(ctx, request)
	return args.Get(0).(utils.Response), args.Error(1)
}

func TestText(t *testing.T) {
	ctx := context.TODO()
	success := `[{ "success": true }]`
	request := model.TextRequestInput{
		FileName: "/test.txt",
		Payload:  map[string]any{"a": "b"},
	}

	type testCase struct {
		name    string
		request model.TextRequestInput

		prepareMock func(app *mockApp, tc *testCase)

		result string
		error  string
	}

	table := []testCase{
		{
			name:    "returns the response",
			request: request,

			prepareMock: func(app *mockApp, tc *testCase) {
				app.
					On("GetFileContent", ctx, mock.Anything).
					Return(utils.Response(success), nil)
			},

			result: success,
		},
		{
			name:    "returns error",
			request: request,

			prepareMock: func(app *mockApp, tc *testCase) {
				app.
					On("GetFileContent", ctx, mock.Anything).
					Return(utils.Response(""), errors.New("some error"))
			},

			result: "[]",
			error:  "error when resolving query",
		},
	}

	for _, test := range table {
		t.Run(test.name, func(t *testing.T) {

			app := &mockApp{}
			resolver := &queryResolver{Resolver: &Resolver{app: app}}

			test.prepareMock(app, &test)

			result, err := resolver.Text(ctx, test.request)

			data, marshalErr := json.Marshal(result)
			if marshalErr != nil {
				t.Fail()
			}

			require.JSONEq(t, string(data), test.result)
			if test.error != "" {
				require.ErrorContains(t, err, test.error)
			} else {
				require.NoError(t, err)
			}
		})
	}
}
