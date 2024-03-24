import { json, LoaderFunctionArgs } from '@remix-run/node';

import { authenticator } from '~/services/auth/auth.server';

const loader = async (args: LoaderFunctionArgs) => {
  const { request } = args;

  const endpoint = `${process.env.API_URL}/file/Home.txt`;

  const user = await authenticator.isAuthenticated(request);

  const result = await fetch(endpoint, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      logged_in: !!user?.username,
      username: user?.username
    })
  });

  return json(await result.json());
};

export { loader };
