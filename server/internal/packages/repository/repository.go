package repository

import (
	"context"
	"encoding/json"
	"github.com/redis/go-redis/v9"
	"server/internal/packages/utils"
)

type Repo struct {
	client redis.Cmdable
}

type RedisFile struct {
	Id        string `json:"id"`
	Name      string `json:"name"`
	Condition string `json:"condition"`
	Text      string `json:"text"`
}

func (r *Repo) GetFileVariations(ctx context.Context, path string) (_ []utils.File, err error) {
	result, err := r.client.Get(ctx, path).Result()
	if err != nil {
		err = utils.ErrFileNotFound
		return
	}

	variations := make([]RedisFile, 0, 5)
	err = json.Unmarshal([]byte(result), &variations)
	if err != nil {
		return
	}

	file := make([]utils.File, len(variations))
	for k, v := range variations {
		file[k] = utils.File{
			Id:        v.Id,
			Name:      v.Name,
			Condition: v.Condition,
			Text:      v.Text,
		}
	}

	return file, nil
}

func NewRepo(client redis.Cmdable) *Repo {
	return &Repo{client: client}
}
