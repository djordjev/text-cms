package app

import (
	"bytes"
	"fmt"
	"server/internal/packages/utils"
	"strings"
	"text/template"
)

const defaultResponse = utils.Response("[]")

type textData struct {
	payload   map[string]any
	variation *utils.Variation
}

func (t *textData) parse() (response utils.Response, err error) {
	defer func() {
		if r := recover(); r != nil {
			err = fmt.Errorf("recover in parse text %v", r)
			response = defaultResponse
		}
	}()

	if t.variation == nil {
		return defaultResponse, nil
	}

	builder := template.New("variation template")

	text := strings.ReplaceAll(t.variation.Text, `\"`, `"`)

	tmpl, err := builder.Parse(text)
	if err != nil {
		return defaultResponse, fmt.Errorf("incorrect data provided for template variables %w", err)
	}

	output := bytes.NewBufferString("")

	err = tmpl.Execute(output, t.payload)
	if err != nil {
		err = fmt.Errorf("can't pair request payload with template variables %w", err)
		response = defaultResponse
		return
	}

	return utils.Response(output.String()), err
}

func newTextParser(payload map[string]any, variation *utils.Variation) *textData {
	return &textData{
		payload:   payload,
		variation: variation,
	}
}
