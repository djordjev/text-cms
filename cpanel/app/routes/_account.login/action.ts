import { ActionFunctionArgs } from '@remix-run/node';

import { STRATEGY_USER_PASS } from '~/constants';
import { authenticator } from '~/services/auth/auth.server';

const action = async (args: ActionFunctionArgs) => {
  const { request } = args;

  const url = new URL(request.url);
  const redirectLink = url.searchParams.get('redirect');

  const successRedirect = redirectLink || '/';

  return authenticator.authenticate(STRATEGY_USER_PASS, request, {
    successRedirect,
    failureRedirect: '/login'
  });
};

export { action };
