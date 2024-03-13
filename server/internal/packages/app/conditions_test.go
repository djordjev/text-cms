package app

import (
	"github.com/stretchr/testify/require"
	"testing"
)

func TestGetValueFromPayload(t *testing.T) {
	nestedMap := map[string]any{"root": map[string]any{"var1": map[string]any{"found": "yes"}}}

	type testCase struct {
		name     string
		payload  map[string]any
		variable string
		value    any
		found    bool
	}

	table := []testCase{
		{
			name:     "finds non nested variable string",
			payload:  map[string]any{"test_name": "something"},
			variable: "test_name",
			value:    "something",
			found:    true,
		},
		{
			name:     "finds non nested variable int",
			payload:  map[string]any{"test_name": 22},
			variable: "test_name",
			value:    22,
			found:    true,
		},
		{
			name:     "does not find non nested variable",
			payload:  map[string]any{"test_name": "something"},
			variable: "non_existent",
		},
		{
			name:     "finds nested string",
			payload:  nestedMap,
			variable: "root.var1.found",
			value:    "yes",
			found:    true,
		},
		{
			name:     "does not find nested string",
			payload:  nestedMap,
			variable: "root.var1.foundX",
		},
		{
			name:     "does not find nested string if not primitive type",
			payload:  nestedMap,
			variable: "root.var1",
		},
		{
			name:     "does not find nested string variable has more segments than payload",
			payload:  nestedMap,
			variable: "root.var1.found.something.else",
		},
	}

	for _, test := range table {
		t.Run(test.name, func(t *testing.T) {
			cm := &conditionMatcher{payload: test.payload}
			value, found := cm.getValueFromPayload(test.variable)

			require.Equal(t, value, test.value)
			require.Equal(t, found, test.found)
		})
	}
}
