package app

import (
	"github.com/djordjev/text-cms/server/internal/packages/utils"
	"github.com/stretchr/testify/require"
	"testing"
)

func TestParseText(t *testing.T) {
	type testCase struct {
		name string

		payload map[string]any
		text    string

		result utils.Response
		error  string
	}

	table := []testCase{
		{
			name:    "returns text with no templates",
			payload: map[string]any{},
			text:    "random text",
			result:  "random text",
		},
		{
			name:    "it replaces simple variable",
			payload: map[string]any{"var": 45},
			text:    "some text number: {{ or .var \"not showing up\" }}",
			result:  "some text number: 45",
		},
		{
			name:    "it uses default value when payload not provided",
			payload: map[string]any{},
			text:    "some text number: {{ or .var \"fallback\" }}",
			result:  "some text number: fallback",
		},
		{
			name:    "it uses nested variable",
			payload: map[string]any{"root": map[string]any{"below": "from payload"}},
			text:    "result {{ or .root.below \"\" }} read from payload",
			result:  "result from payload read from payload",
		},
		{
			name:    "it returns an error",
			payload: nil,
			text:    "something {{ }}",
			result:  "[]",
			error:   "incorrect data provided for template variables template",
		},
	}

	for _, test := range table {
		t.Run(test.name, func(t *testing.T) {
			td := newTextParser(test.payload, &utils.Variation{Text: test.text})

			result, err := td.parse()

			require.Equal(t, result, test.result)
			if test.error != "" {
				require.ErrorContains(t, err, test.error)
			} else {
				require.NoError(t, err)
			}
		})
	}
}
