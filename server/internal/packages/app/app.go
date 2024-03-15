package app

import (
	"context"
	"fmt"
	"server/internal/packages/utils"
	"sync"
)

type Domain struct {
	repo Repository
}

type Repository interface {
	GetFileVariations(ctx context.Context, path string) (file []utils.File, err error)
}

func (d *Domain) GetFileContent(ctx context.Context, payload utils.Request) (response utils.Response, err error) {
	variations, err := d.repo.GetFileVariations(ctx, payload.Path)
	if err != nil {
		err = fmt.Errorf("file not found %s", payload.Path)
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
		)

		go matcher.run()
	}

	wg.Wait()

	var conditionMet *utils.File

	for k, v := range matcherResults {
		if v == true {
			conditionMet = &variations[k]
			break
		}
	}

	if conditionMet == nil {
		// if file exists but no condition is matched return empty response
		return utils.Response(""), nil
	}

	return utils.Response(conditionMet.Text), nil
}

func NewDomain(repository Repository) *Domain {
	domain := &Domain{repo: repository}

	return domain
}
