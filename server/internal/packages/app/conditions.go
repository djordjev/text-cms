package app

import (
	"encoding/json"
	"errors"
	"fmt"
	"log/slog"
	"strings"
	"sync"
)

type Descriptor [3]string
type AndChain []Descriptor
type Group []AndChain

var ErrorNoVariable = errors.New("unable to pluck data")

type conditionMatcher struct {
	condition string
	done      *sync.WaitGroup
	payload   map[string]any
	result    *bool
	logger    *slog.Logger
}

func newConditionMatcher(condition string, payload map[string]any, done *sync.WaitGroup, result *bool, logger *slog.Logger) *conditionMatcher {
	return &conditionMatcher{
		condition: condition,
		done:      done,
		payload:   payload,
		result:    result,
		logger:    logger,
	}
}

func (cm *conditionMatcher) run() {
	defer func() {
		if cm.done != nil {
			cm.done.Done()
		}

		if r := recover(); r != nil {
			fmt.Println(fmt.Sprintf("recovering from %v", r))
		}
	}()

	if cm.result == nil || cm.done == nil {
		cm.logger.Error("internal error, not provided sync variables")
		panic(errors.New("not provided sync vars"))
	}

	if cm.condition == "" || cm.condition == "[]" {
		*cm.result = true
		return
	}

	parsed := make(Group, 3)

	err := json.Unmarshal([]byte(cm.condition), &parsed)
	if err != nil {
		cm.logger.Error(fmt.Sprintf("internal error, cant unmarshal condition %s", cm.condition))
		panic(errors.New("cant unmarshal condition"))
	}

	for _, chain := range parsed {
		result, err := cm.checkAndChain(chain)
		if err != nil {
			cm.logger.Error("internal error, cant parse and chain", "chain", chain)
			panic(errors.New("cant parse"))
		}

		if result {
			*cm.result = true
		}
	}

}

func (cm *conditionMatcher) checkAndChain(andChain AndChain) (result bool, err error) {
	for _, descriptor := range andChain {
		res, descError := cm.checkDescriptor(descriptor)
		if errors.Is(descError, ErrorNoVariable) || !res {
			return false, nil
		} else if err != nil {
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
		return false, fmt.Errorf("%w from payload %s, ", ErrorNoVariable, variable)
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
