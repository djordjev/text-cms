import { Authenticator, AuthorizationError } from 'remix-auth';
import { FormStrategy } from 'remix-auth-form';
import { z, ZodError } from 'zod';

import { getUser } from '~/api/user.server';
import { STRATEGY_USER_PASS } from '~/constants';
import { sessionStorage } from '~/services/auth/session.server';
import { User } from '~/types/user';

export const authenticator = new Authenticator<User>(sessionStorage);

const payload = z.object({
  username: z.string().min(3, 'incorrect username'),
  password: z.string().min(5, 'incorrect password')
});

type RequestPayload = z.infer<typeof payload>;

export const loginCallback = async (form: FormData) => {
  let values: RequestPayload;

  try {
    values = payload.parse(Object.fromEntries(form));
  } catch (e) {
    const err = e as ZodError;
    throw new AuthorizationError(err.issues[0].message);
  }

  const user = await getUser(values.username, values.password);

  if (!user) throw new AuthorizationError('invalid username or password');

  return { username: user.username };
};

authenticator.use(
  new FormStrategy(({ form }) => loginCallback(form)),
  STRATEGY_USER_PASS
);
