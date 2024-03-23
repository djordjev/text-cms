import { json, LoaderFunctionArgs } from '@remix-run/node';

import { authenticator } from '~/services/auth/auth.server';
import { commitSession, getSession } from '~/services/auth/session.server';

const loader = async (args: LoaderFunctionArgs) => {
  const { request } = args;

  await authenticator.isAuthenticated(request, {
    successRedirect: '/'
  });

  const session = await getSession(request.headers.get('cookie'));
  const error = session.get(authenticator.sessionErrorKey);

  return json(
    { error },
    { headers: { 'Set-Cookie': await commitSession(session) } }
  );
};

export { loader };
