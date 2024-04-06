package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.45

import (
	"context"
	"encoding/json"
	"fmt"
	graphql1 "github.com/djordjev/text-cms/server/internal/packages/communication/graphql/generated"
	"github.com/djordjev/text-cms/server/internal/packages/communication/graphql/model"
	"github.com/djordjev/text-cms/server/internal/packages/utils"
)

// Ping is the resolver for the ping field.
func (r *queryResolver) Ping(ctx context.Context) (string, error) {
	return "pong", nil
}

// Text is the resolver for the text field.
func (r *queryResolver) Text(ctx context.Context, request model.TextRequestInput) ([]interface{}, error) {
	var payload map[string]any

	asserted, ok := request.Payload.(map[string]any)

	if request.Payload != nil && ok {
		payload = asserted
	} else {
		payload = make(map[string]any)
	}

	response, err := r.app.GetFileContent(ctx, utils.Request{
		Path:    request.FileName,
		Payload: payload,
	})

	if err != nil {
		return []any{}, fmt.Errorf("error when resolving query %w", err)
	}

	res := make([]any, 0)

	err = json.Unmarshal([]byte(response), &res)
	if err != nil {
		return []any{}, fmt.Errorf("error when parsing response %w", err)
	}

	return res, nil
}

// Query returns graphql1.QueryResolver implementation.
func (r *Resolver) Query() graphql1.QueryResolver { return &queryResolver{r} }

type queryResolver struct{ *Resolver }