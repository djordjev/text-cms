package app

import (
	"github.com/stretchr/testify/require"
	"sync"
	"testing"
)

func TestRun(t *testing.T) {
	type testCase struct {
		name      string
		result    bool
		payload   map[string]any
		condition string
	}

	tests := []testCase{
		{
			name:      "returns true when one condition group is met",
			result:    true,
			payload:   map[string]any{"a": 1, "b": "OK", "c": true},
			condition: `[[["a", "=", "1"], ["c", "=", "true"]], [["a", "=", "8"], ["n", "=", "12"], ["c", "=", "false"]]]`,
		},
		{
			name:      "returns false when no condition is met",
			result:    false,
			payload:   map[string]any{"a": 1, "b": "OK", "c": true},
			condition: `[[["a", "=", "9"], ["c", "=", "true"]], [["a", "=", "8"], ["n", "=", "12"], ["c", "=", "false"]]]`,
		},
		{
			name:      "returns true for single condition",
			result:    true,
			payload:   map[string]any{"a": "OK"},
			condition: `[[["a", "=", "OK"]]]`,
		},
		{
			name:      "returns false for single condition",
			result:    false,
			payload:   map[string]any{"a": "NOT OK"},
			condition: `[[["a", "=", "OK"]]]`,
		},
		{
			name:      "returns true when no condition",
			result:    true,
			payload:   map[string]any{},
			condition: "",
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			wg := sync.WaitGroup{}
			wg.Add(1)

			var result bool

			cm := &conditionMatcher{
				condition: test.condition,
				payload:   test.payload,
				done:      &wg,
				result:    &result,
			}

			cm.run()

			wg.Wait()

			require.Equal(t, result, test.result)
		})
	}
}

func TestCheckAndChain(t *testing.T) {
	type testCase struct {
		name    string
		chain   AndChain
		payload map[string]any
		result  bool
		err     string
	}

	tests := []testCase{
		{
			name: "returns true when all conditions are met",
			chain: AndChain(
				[]Descriptor{
					Descriptor([]string{"a", "=", "1"}),
					Descriptor([]string{"b.inner", "=", "some text"}),
					Descriptor([]string{"c", "=", "TrUe"}),
				},
			),
			payload: map[string]any{"a": 1, "b": map[string]any{"inner": "some text"}, "c": true},
			result:  true,
		},
		{
			name: "returns false when at least one condition is not met",
			chain: AndChain(
				[]Descriptor{
					Descriptor([]string{"a", "=", "1"}),
					Descriptor([]string{"b", ">", "7.11"}),
				},
			),
			payload: map[string]any{"a": 1, "b": 6.54},
			result:  false,
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			cm := &conditionMatcher{payload: test.payload}
			result, err := cm.checkAndChain(test.chain)

			require.Equal(t, result, test.result)
			if test.err != "" {
				require.ErrorContains(t, err, test.err)
			} else {
				require.NoError(t, err)
			}
		})
	}

}

func TestCheckDescriptor(t *testing.T) {
	type testCase struct {
		name       string
		descriptor Descriptor
		payload    map[string]any
		result     bool
		err        string
	}

	table := []testCase{
		{
			name:       "returns true for int",
			descriptor: Descriptor([]string{"test_value", "=", "12"}),
			payload:    map[string]any{"test_value": "12"},
			result:     true,
		},
		{
			name:       "returns false for int",
			descriptor: Descriptor([]string{"test_value", "=", "15"}),
			payload:    map[string]any{"test_value": "12"},
			result:     false,
		},
		{
			name:       "returns true for string",
			descriptor: Descriptor([]string{"test_value", "=", "djordje"}),
			payload:    map[string]any{"test_value": "djordje"},
			result:     true,
		},
		{
			name:       "returns false for string",
			descriptor: Descriptor([]string{"test_value", "=", "djordje"}),
			payload:    map[string]any{"test_value": "something else"},
			result:     false,
		},
		{
			name:       "returns true for float",
			descriptor: Descriptor([]string{"test_value", "=", "14.6"}),
			payload:    map[string]any{"test_value": "14.6"},
			result:     true,
		},
		{
			name:       "returns false for float",
			descriptor: Descriptor([]string{"test_value", "=", "14.6"}),
			payload:    map[string]any{"test_value": "14.7"},
			result:     false,
		},
		{
			name:       "returns true for bool",
			descriptor: Descriptor([]string{"test_value", "=", "true"}),
			payload:    map[string]any{"test_value": "true"},
			result:     true,
		},
		{
			name:       "returns false for bool",
			descriptor: Descriptor([]string{"test_value", "=", "false"}),
			payload:    map[string]any{"test_value": "true"},
			result:     false,
		},
		{
			name:       "returns an error for unknown type",
			descriptor: Descriptor([]string{"test_value", "=", "random"}),
			payload:    map[string]any{"test_value": map[string]any{"something": "else"}},
			result:     false,
			err:        "unable to pluck data from payload test_value",
		},
	}

	for _, test := range table {
		t.Run(test.name, func(t *testing.T) {
			cm := &conditionMatcher{payload: test.payload}

			result, err := cm.checkDescriptor(test.descriptor)

			require.Equal(t, result, test.result)
			if test.err != "" {
				require.ErrorContains(t, err, test.err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

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
