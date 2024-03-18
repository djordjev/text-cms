package app

import (
	"bytes"
	"server/internal/packages/utils"
	"text/template"
)

type TextData struct {
	Variables map[string]any
}

func parseVariationText(variation *utils.Variation, payload map[string]any) string {
	if variation == nil {
		return "[]"
	}

	builder := template.New("variation template")

	tmpl, err := builder.Parse(variation.Text)
	if err != nil {
		panic(err)
	}

	output := bytes.NewBufferString("")

	//data := TextData{Variables: payload}

	err = tmpl.Execute(output, payload)
	if err != nil {
		panic(err)
	}

	return output.String()
}
