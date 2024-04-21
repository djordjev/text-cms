import { json, LoaderFunctionArgs } from '@remix-run/node';

import { authenticator } from '~/services/auth/auth.server';

const fetchRest = async (username?: string) => {
  const endpoint = `${process.env.API_URL}/file/Home.txt`;

  const result = await fetch(endpoint, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      logged_in: !!username,
      username
    })
  });

  return result;
};

const fetchGraphql = async (username?: string) => {
  const endpoint = `${process.env.API_URL}/graphql`;

  const result = await fetch(endpoint, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      query: `
        query FetchItem($input: TextRequestInput!) {
          text(request: $input)
        }
      `,
      variables: {
        input: {
          fileName: '/Home.txt',
          payload: { logged_in: !!username, username }
        }
      }
    })
  });

  return result;
};

const loader = async (args: LoaderFunctionArgs) => {
  const { request } = args;

  const user = await authenticator.isAuthenticated(request);
  const username = user?.username ?? undefined;

  if (process.env.PROTOCOL === 'rest') {
    const result = await fetchRest(username);
    return json(await result.json());
  } else if (process.env.PROTOCOL === 'graphql') {
    const result = await fetchGraphql(username);
    const responseJson = await result.json();

    return json(responseJson?.data?.text ?? []);
  }
};

export { loader };
