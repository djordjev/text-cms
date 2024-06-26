package app

import (
	"context"
	"errors"
	"github.com/djordjev/text-cms/server/internal/packages/utils"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"testing"
)

var ctx = utils.AddLoggerToContext(context.TODO(), utils.NewEmptyLogger())

type mockRepo struct {
	mock.Mock
}

func (m *mockRepo) GetFileVariations(ctx context.Context, path string) (file []utils.Variation, err error) {
	args := m.Called(ctx, path)
	return args.Get(0).([]utils.Variation), args.Error(1)
}

func newMockRepo() Repository {
	repo := &mockRepo{}

	repo.
		On("GetFileVariations", ctx, "/somefile.txt").
		Return([]utils.Variation{{
			Id:        "1",
			Name:      "First Variation",
			Condition: `[[["first", "=", "t"]]]`,
			Text:      "text for first variation",
		}, {
			Id:        "2",
			Name:      "Second Variation",
			Condition: `[[["first", "=", "f"], ["second", "=", "t"]]]`,
			Text:      "text for second variation",
		}}, nil)

	return repo
}

func TestGetFileContent(t *testing.T) {

	type testCase struct {
		name          string
		payload       utils.Request
		newRepository func() Repository

		result utils.Response
		error  string
	}

	table := []testCase{
		{
			name:    "returns file not found",
			payload: utils.Request{Path: "/somefile.txt", Payload: nil},
			newRepository: func() Repository {
				repo := &mockRepo{}
				repo.
					On("GetFileVariations", ctx, "/somefile.txt").
					Return([]utils.Variation{}, errors.New("not found"))

				return repo
			},

			result: utils.Response(""),
			error:  "/somefile.txt not found",
		},
		{
			name: "it returns matched variation",
			payload: utils.Request{
				Path:    "/somefile.txt",
				Payload: map[string]any{"first": false, "second": true},
			},
			newRepository: newMockRepo,
			result:        utils.Response("text for second variation"),
		},
		{
			name: "it returns empty array if no variation is matched",
			payload: utils.Request{
				Path:    "/somefile.txt",
				Payload: map[string]any{},
			},
			newRepository: newMockRepo,
			result:        utils.Response("[]"),
		},
	}

	for _, test := range table {
		t.Run(test.name, func(t *testing.T) {
			repo := test.newRepository()
			domain := NewDomain(repo)

			result, err := domain.GetFileContent(ctx, test.payload)

			require.Equal(t, result, test.result)
			if test.error != "" {
				require.ErrorContains(t, err, test.error)
			} else {
				require.NoError(t, err)
			}
		})
	}
}
