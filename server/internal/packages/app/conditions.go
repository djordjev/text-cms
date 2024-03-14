package app

import (
	"encoding/json"
	"errors"
	"fmt"
	"strings"
	"sync"
)

type Descriptor [3]string
type AndChain []Descriptor
type Group []AndChain

type conditionMatcher struct {
	condition string
	done      *sync.WaitGroup
	payload   map[string]any
	result    *bool
}

func newConditionMatcher(condition string, payload map[string]any, done *sync.WaitGroup, result *bool) *conditionMatcher {
	return &conditionMatcher{
		condition: condition,
		done:      done,
		payload:   payload,
		result:    result,
	}
}

func (cm *conditionMatcher) run() {
	defer cm.done.Done()

	if cm.result == nil || cm.done == nil {
		panic(errors.New("not provided sync vars"))
	}

	if cm.condition == "" {
		*cm.result = true
	}

	parsed := make(Group, 3)

	err := json.Unmarshal([]byte(cm.condition), &parsed)
	if err != nil {
		panic(errors.New("cant unmarshal condition"))
	}

	for _, chain := range parsed {
		result, err := cm.checkAndChain(chain)
		if err != nil {
			panic(errors.New("cant parse"))
		}

		if result {
			*cm.result = true
		}
	}

}

func (cm *conditionMatcher) checkAndChain(andChain AndChain) (result bool, err error) {
	for _, descriptor := range andChain {
		res, err := cm.checkDescriptor(descriptor)
		if err != nil || !res {
			return false, err
		}
	}

	return true, nil
}

func (cm *conditionMatcher) checkDescriptor(descriptor Descriptor) (result bool, err error) {
	variable := descriptor[0]
	operator := descriptor[1]
	expected := descriptor[2]

	value, found := cm.getValueFromPayload(variable)
	if !found {
		return false, fmt.Errorf("unable to pluck data from payload %s", variable)
	}

	switch value.(type) {
	case int:
		{
			return compareInt(value.(int), operator, expected)
		}
	case string:
		{
			return compareString(value.(string), operator, expected)
		}
	case float32:
	case float64:
		{
			return compareFloat(value.(float64), operator, expected)
		}
	case bool:
		{
			return compareBool(value.(bool), operator, expected)
		}
	default:
		{
			return false, errors.New("unknown type")
		}
	}

	return

}

func (cm *conditionMatcher) getValueFromPayload(variable string) (value any, found bool) {
	parts := strings.Split(variable, ".")

	current := cm.payload

	for k, v := range parts {
		isLast := k == len(parts)-1

		if isLast {
			value, found = current[v]

			_, isMap := value.(map[string]any)
			if isMap {
				value, found = nil, false
				return
			}

			return
		}

		inner, ok := current[v].(map[string]any)
		if !ok {
			return
		}

		current = inner
	}

	return
}
