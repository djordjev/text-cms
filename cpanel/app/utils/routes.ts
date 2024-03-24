import { LoaderFunctionArgs } from '@remix-run/node';

import { authenticator } from '~/services/auth/auth.server';

const auth = async (args: LoaderFunctionArgs) => {
  const { request } = args;

  const url = new URLSearchParams();
  url.append('redirect', request.url);

  const failureRedirect = `/login?${url.toString()}`;

  return authenticator.isAuthenticated(request, { failureRedirect });
};

export { auth };
