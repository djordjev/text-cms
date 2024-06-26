package repository

import (
	"context"
	"errors"
	"github.com/djordjev/text-cms/server/internal/packages/utils"
	"github.com/redis/go-redis/v9"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"testing"
)

var fileContent = `
[
    {
        "id": "1",
        "name": "First",
        "condition": "[[[\"a\", \"=\", \"1\"]]]",
        "text": "text 1"
    },
    {
        "id": "2",
        "name": "Second",
        "condition": "[[[\"b\", \"=\", \"2\"]]]",
        "text": "text 2"
    }
]
`

var ctx = context.TODO()

type mockClient struct {
	mock.Mock
	redis.Cmdable
}

func (m *mockClient) Get(ctx context.Context, path string) *redis.StringCmd {
	args := m.Called(ctx, path)
	return args.Get(0).(*redis.StringCmd)
}

func TestGetFileVariations(t *testing.T) {
	type testCase struct {
		name          string
		path          string
		newClientMock func() redis.Cmdable

		result []utils.Variation
		err    error
	}

	table := []testCase{
		{
			name: "returns error when file not found",
			path: "/somefile.txt",
			newClientMock: func() redis.Cmdable {
				client := &mockClient{}

				cmd := redis.StringCmd{}
				cmd.SetErr(errors.New("error"))
				cmd.SetVal("")

				client.On("Get", ctx, "/somefile.txt").Return(&cmd)

				return client
			},
			result: []utils.Variation{},
			err:    utils.ErrFileNotFound,
		},
		{
			name: "returns file when found",
			path: "/somefile.txt",
			newClientMock: func() redis.Cmdable {
				client := &mockClient{}

				cmd := redis.StringCmd{}
				cmd.SetVal(fileContent)

				client.On("Get", ctx, "/somefile.txt").Return(&cmd)

				return client
			},

			result: []utils.Variation{
				{
					Id:        "1",
					Name:      "First",
					Condition: `[[[\"a\", \"=\", \"1\"]]]`,
					Text:      "text 1",
				},
				{
					Id:        "2",
					Name:      "Second",
					Condition: `[[[\"b\", \"=\", \"2\"]]]`,
					Text:      "text 2",
				},
			},
		},
	}

	for _, test := range table {
		t.Run(test.name, func(t *testing.T) {

			repo := NewRepo(test.newClientMock())

			result, err := repo.GetFileVariations(ctx, test.path)

			for k, v := range result {
				require.Equal(t, v.Id, test.result[k].Id)
				require.Equal(t, v.Name, test.result[k].Name)
				require.Equal(t, v.Condition, test.result[k].Condition)
				require.Equal(t, v.Text, test.result[k].Text)
			}

			if test.err != nil {
				require.ErrorIs(t, err, test.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}
