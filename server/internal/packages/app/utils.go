package app

import (
	"fmt"
	"math"
	"slices"
	"strconv"
	"strings"
)

var numericOperators = []string{"=", ">", ">=", "<", "<="}
var stringOperators = []string{"="}
var boolOperators = []string{"="}

func compareInt(value int, operator string, expected string) (result bool, err error) {
	contains := slices.Contains(numericOperators, operator)
	if !contains {
		return false, fmt.Errorf("unknown operator %s", operator)
	}

	intExpected, err := strconv.Atoi(expected)
	if err != nil {
		return false, fmt.Errorf("invalid expected int value %s", expected)
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
		return false, fmt.Errorf("unknown operator %s", operator)
	}

	return
}

func compareFloat(value float64, operator string, expected string) (result bool, err error) {
	contains := slices.Contains(numericOperators, operator)
	if !contains {
		return false, fmt.Errorf("unknown operator %s", operator)
	}

	floatExpected, err := strconv.ParseFloat(expected, 64)
	if err != nil {
		return false, fmt.Errorf("invalid expected float value %s", expected)
	}

	switch operator {
	case "=":
		{
			result = math.Abs(value-floatExpected) < 0.001
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
		return false, fmt.Errorf("unknown operator %s", operator)
	}

	return
}

func compareString(value string, operator string, expected string) (result bool, error error) {
	contains := slices.Contains(stringOperators, operator)
	if !contains {
		return false, fmt.Errorf("unknown operator %s", operator)
	}

	switch operator {
	case "=":
		{
			result = value == expected
		}
	default:
		return false, fmt.Errorf("unknown operator %s", operator)
	}

	return
}

func compareBool(value bool, operator string, expected string) (result bool, error error) {
	contains := slices.Contains(boolOperators, operator)
	if !contains {
		return false, fmt.Errorf("unknown operator %s", operator)
	}

	formatted := strings.ToLower(expected)
	if formatted != "true" && formatted != "false" && formatted != "t" && formatted != "f" {
		return false, fmt.Errorf("can not compare boolean with %s", formatted)
	}

	expectTrue := formatted == "true" || formatted == "t"

	switch operator {
	case "=":
		{
			result = value == expectTrue
		}
	default:
		return false, fmt.Errorf("unknown operator %s", operator)
	}

	return
}
