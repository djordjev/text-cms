package app

import (
	"github.com/stretchr/testify/require"
	"testing"
)

func TestCompareInt(t *testing.T) {
	type testCase struct {
		name     string
		value    int
		operator string
		expected string

		result bool
		error  string
	}

	table := []testCase{
		{
			name:     "returns true for equality operator",
			value:    1,
			operator: "=",
			expected: "1",
			result:   true,
		},
		{
			name:     "returns false for equality operator",
			value:    1,
			operator: "=",
			expected: "2",
			result:   false,
		},
		{
			name:     "returns true for greater than",
			value:    5,
			operator: ">",
			expected: "4",
			result:   true,
		},
		{
			name:     "returns false for greater than",
			value:    4,
			operator: ">",
			expected: "5",
			result:   false,
		},
		{
			name:     "returns true for greater or equal",
			value:    5,
			operator: ">=",
			expected: "5",
			result:   true,
		},
		{
			name:     "returns false for greater or equal",
			value:    4,
			operator: ">=",
			expected: "6",
			result:   false,
		},
		{
			name:     "returns true for less then",
			value:    2,
			operator: "<",
			expected: "3",
			result:   true,
		},
		{
			name:     "returns false for less then",
			value:    5,
			operator: "<",
			expected: "2",
			result:   false,
		},
		{
			name:     "returns true for less then or equal",
			value:    2,
			operator: "<=",
			expected: "2",
			result:   true,
		},
		{
			name:     "returns false for less then or equal",
			value:    4,
			operator: "<=",
			expected: "2",
			result:   false,
		},
		{
			name:     "returns error for invalid operator",
			value:    2,
			operator: "$",
			expected: "2",
			result:   false,
			error:    "unknown operator $",
		},
		{
			name:     "returns error for invalid float value",
			value:    2,
			operator: "=",
			expected: "rs1",
			result:   false,
			error:    "invalid expected int value rs1",
		},
	}

	for _, test := range table {
		result, err := compareInt(test.value, test.operator, test.expected)

		require.Equal(t, result, test.result)
		if test.error != "" {
			require.ErrorContains(t, err, test.error)
		} else {
			require.NoError(t, err)
		}
	}
}

func TestCompareFloat(t *testing.T) {
	type testCase struct {
		name     string
		value    float64
		operator string
		expected string

		result bool
		error  string
	}

	table := []testCase{
		{
			name:     "returns true for equality operator",
			value:    1.22,
			operator: "=",
			expected: "1.22",
			result:   true,
		},
		{
			name:     "returns false for equality operator",
			value:    1.221,
			operator: "=",
			expected: "1.22",
			result:   false,
		},
		{
			name:     "returns true for greater than",
			value:    1.221,
			operator: ">",
			expected: "1.22",
			result:   true,
		},
		{
			name:     "returns false for greater than",
			value:    1.01,
			operator: ">",
			expected: "1.22",
			result:   false,
		},
		{
			name:     "returns true for greater or equal",
			value:    1.22,
			operator: ">=",
			expected: "1.22",
			result:   true,
		},
		{
			name:     "returns false for greater or equal",
			value:    1.01,
			operator: ">=",
			expected: "1.22",
			result:   false,
		},
		{
			name:     "returns true for less then",
			value:    1.22,
			operator: "<",
			expected: "1.32",
			result:   true,
		},
		{
			name:     "returns false for less then",
			value:    1.01,
			operator: "<",
			expected: "1.001",
			result:   false,
		},
		{
			name:     "returns true for less then or equal",
			value:    1.22,
			operator: "<=",
			expected: "1.22",
			result:   true,
		},
		{
			name:     "returns false for less then or equal",
			value:    1.21,
			operator: "<=",
			expected: "1.001",
			result:   false,
		},
		{
			name:     "returns error for invalid operator",
			value:    1.2,
			operator: "$",
			expected: "1.2",
			result:   false,
			error:    "unknown operator $",
		},
		{
			name:     "returns error for invalid float value",
			value:    1.2,
			operator: "=",
			expected: "rs1.2",
			result:   false,
			error:    "invalid expected float value rs1.2",
		},
	}

	for _, test := range table {
		result, err := compareFloat(test.value, test.operator, test.expected)

		require.Equal(t, result, test.result)
		if test.error != "" {
			require.ErrorContains(t, err, test.error)
		} else {
			require.NoError(t, err)
		}
	}

}

func TestCompareString(t *testing.T) {
	type testCase struct {
		name     string
		value    string
		operator string
		expected string

		result bool
		error  string
	}

	table := []testCase{
		{
			name:     "returns true for same strings",
			value:    "str_value",
			operator: "=",
			expected: "str_value",
			result:   true,
		},
		{
			name:     "returns false for different",
			value:    "different",
			operator: "=",
			expected: "str_value",
			result:   false,
		},
		{
			name:     "invalid string operator",
			value:    "str_value",
			operator: "<=",
			expected: "str_value",
			result:   false,
			error:    "unknown operator <=",
		},
	}

	for _, test := range table {
		t.Run(test.name, func(t *testing.T) {
			result, err := compareString(test.value, test.operator, test.expected)

			require.Equal(t, result, test.result)
			if test.error != "" {
				require.ErrorContains(t, err, test.error)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

func TestCompareBool(t *testing.T) {
	type testCase struct {
		name     string
		value    bool
		operator string
		expected string

		result bool
		error  string
	}

	table := []testCase{
		{
			name:     "compares true with true",
			value:    true,
			operator: "=",
			expected: "true",
			result:   true,
		},
		{
			name:     "compares false with false",
			value:    false,
			operator: "=",
			expected: "false",
			result:   true,
		},
		{
			name:     "compares true with false",
			value:    true,
			operator: "=",
			expected: "false",
			result:   false,
		},
		{
			name:     "compares false with true",
			value:    false,
			operator: "=",
			expected: "true",
			result:   false,
		},
		{
			name:     "invalid bool operator",
			value:    false,
			operator: ">",
			expected: "true",
			result:   false,
			error:    "unknown operator >",
		},
		{
			name:     "comparison with string that is not true or false",
			value:    false,
			operator: "=",
			expected: "something else",
			result:   false,
			error:    "can not compare boolean with something else",
		},
	}

	for _, test := range table {
		t.Run(test.name, func(t *testing.T) {
			result, err := compareBool(test.value, test.operator, test.expected)

			require.Equal(t, result, test.result)
			if test.error != "" {
				require.ErrorContains(t, err, test.error)
			} else {
				require.NoError(t, err)
			}
		})
	}
}
