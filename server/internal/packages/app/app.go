package app

import (
	"context"
	"fmt"
	"github.com/djordjev/text-cms/server/internal/packages/utils"
	"sync"
)

type Domain struct {
	repo Repository
}

type Repository interface {
	GetFileVariations(ctx context.Context, path string) (file []utils.Variation, err error)
}

func (d *Domain) GetFileContent(ctx context.Context, payload utils.Request) (response utils.Response, err error) {
	variations, err := d.repo.GetFileVariations(ctx, payload.Path)
	if err != nil {
		err = fmt.Errorf("%s %w", payload.Path, err)
		return
	}

	count := len(variations)

	matcherResults := make([]bool, count)
	var wg sync.WaitGroup
	wg.Add(count)

	for index, variation := range variations {
		matcher := newConditionMatcher(
			variation.Condition,
			payload.Payload,
			&wg,
			&matcherResults[index],
			utils.GetLoggerFromContext(ctx),
		)

		go matcher.run()
	}

	wg.Wait()

	var conditionMet *utils.Variation

	for k, v := range matcherResults {
		if v == true {
			conditionMet = &variations[k]
			break
		}
	}

	parser := newTextParser(payload.Payload, conditionMet)

	return parser.parse()
}

func NewDomain(repository Repository) *Domain {
	domain := &Domain{repo: repository}

	return domain
}
