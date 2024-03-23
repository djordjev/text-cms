import { ActionFunctionArgs } from '@remix-run/node';

import { authenticator } from '~/services/auth/auth.server';

const action = async (args: ActionFunctionArgs) => {
  const { request } = args;

  const result = await authenticator.authenticate('user-pass', request, {
    successRedirect: '/',
    failureRedirect: '/login'
  });

  console.log(result, 'result');

  return result;
};

export { action };
