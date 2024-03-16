package rest

import (
	"bytes"
	"context"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"log/slog"
	"net/http"
	"net/http/httptest"
	"server/internal/packages/utils"
	"strings"
	"testing"
)

var ctx = context.TODO()

type mockDomain struct {
	mock.Mock
}

func (m *mockDomain) GetFileContent(ctx context.Context, request utils.Request) (response utils.Response, err error) {
	args := m.Called(ctx, request)
	return args.Get(0).(utils.Response), args.Error(1)
}

func TestHttpServer(t *testing.T) {
	type testCase struct {
		name          string
		newMockDomain func() Domain

		result string
		status int
	}

	table := []testCase{
		{
			name: "returns found variation",
			newMockDomain: func() Domain {
				domain := &mockDomain{}

				requestMatcher := mock.MatchedBy(func(req utils.Request) bool {
					return req.Path == "/somefile.txt" && len(req.Payload) == 1
				})

				domain.
					On("GetFileContent", mock.Anything, requestMatcher).
					Return(utils.Response("{ found: true }"), nil)

				return domain
			},
			result: "{ found: true }",
			status: http.StatusOK,
		},
		{
			name: "returns file not found",
			newMockDomain: func() Domain {
				domain := &mockDomain{}

				domain.
					On("GetFileContent", mock.Anything, mock.Anything).
					Return(utils.Response(""), utils.ErrFileNotFound)

				return domain
			},
			status: http.StatusNotFound,
		},
	}

	for _, test := range table {
		t.Run(test.name, func(t *testing.T) {
			url := "/files/somefile.txt"

			var buffer bytes.Buffer
			logger := slog.New(slog.NewJSONHandler(&buffer, nil))

			server := NewRestServer(utils.Config{Method: "GET"}, test.newMockDomain(), logger)

			rr := httptest.NewRecorder()

			r2 := httptest.NewRequest("GET", url, strings.NewReader("{\"a\": 1}"))
			r2.SetPathValue("pathname", "somefile.txt")

			server.getFile(rr, r2)

			require.Equal(t, rr.Body.String(), test.result)
			require.Equal(t, rr.Code, test.status)
		})
	}
}
