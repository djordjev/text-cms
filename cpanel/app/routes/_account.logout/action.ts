import { ActionFunctionArgs } from '@remix-run/node';

import { authenticator } from '~/services/auth/auth.server';

const action = async (args: ActionFunctionArgs) => {
  const { request } = args;

  return authenticator.logout(request, { redirectTo: '/' });
};

export { action };
