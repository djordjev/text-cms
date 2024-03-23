import { ActionFunctionArgs } from '@remix-run/node';

import { STRATEGY_USER_PASS } from '~/constants';
import { authenticator } from '~/services/auth/auth.server';

const action = async (args: ActionFunctionArgs) => {
  const { request } = args;

  return authenticator.authenticate(STRATEGY_USER_PASS, request, {
    successRedirect: '/',
    failureRedirect: '/login'
  });
};

export { action };
