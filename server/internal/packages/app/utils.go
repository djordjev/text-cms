package app

import (
	"errors"
	"slices"
	"strconv"
	"strings"
)

var numericOperators = []string{"=", ">", ">=", "<", "<="}
var stringOperators = []string{"="}
var boolOperators = []string{"="}

func compareInt(value int, operator string, expected string) (result bool, error error) {
	contains := slices.Contains(numericOperators, operator)
	if !contains {
		return false, errors.New("invalid operator")
	}

	intExpected, error := strconv.Atoi(expected)
	if error != nil {
		return false, errors.New("unable to parse string to int")
	}

	switch operator {
	case "=":
		{
			result = value == intExpected
		}
	case ">":
		{
			result = value > intExpected
		}
	case ">=":
		{
			result = value >= intExpected
		}
	case "<":
		{
			result = value < intExpected
		}
	case "<=":
		{
			result = value <= intExpected
		}
	default:
		return false, errors.New("unknown operator")
	}

	return
}

func compareFloat(value float64, operator string, expected string) (result bool, error error) {
	contains := slices.Contains(numericOperators, operator)
	if !contains {
		return false, errors.New("invalid operator")
	}

	floatExpected, error := strconv.ParseFloat(expected, 32)
	if error != nil {
		return false, errors.New("unable to parse string to int")
	}

	switch operator {
	case "=":
		{
			result = value == floatExpected
		}
	case ">":
		{
			result = value > floatExpected
		}
	case ">=":
		{
			result = value >= floatExpected
		}
	case "<":
		{
			result = value < floatExpected
		}
	case "<=":
		{
			result = value <= floatExpected
		}
	default:
		return false, errors.New("unknown operator")
	}

	return
}

func compareString(value string, operator string, expected string) (result bool, error error) {
	contains := slices.Contains(stringOperators, operator)
	if !contains {
		return false, errors.New("invalid operator")
	}

	switch operator {
	case "=":
		{
			result = value == expected
		}
	default:
		return false, errors.New("unknown operator")
	}

	return
}

func compareBool(value bool, operator string, expected string) (result bool, error error) {
	contains := slices.Contains(boolOperators, operator)
	if !contains {
		return false, errors.New("invalid operator")
	}

	expectTrue := strings.ToLower(expected) == "true"

	switch operator {
	case "=":
		{
			result = value == expectTrue
		}
	default:
		return false, errors.New("unknown operator")
	}

	return
}
