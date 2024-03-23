import { json, LoaderFunctionArgs } from '@remix-run/node';

import { getContentForPath } from '~/api/finder.server';
import { authenticator } from '~/services/auth/auth.server';

const loader = async (args: LoaderFunctionArgs) => {
  const { params, request } = args;

  await authenticator.isAuthenticated(request, { failureRedirect: '/login' });

  const path = `/${params['*']}`;

  const result = await getContentForPath(path);

  return json(result);
};

export { loader };
