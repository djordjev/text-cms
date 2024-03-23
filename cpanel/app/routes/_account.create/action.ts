import { ActionFunctionArgs, redirect } from '@remix-run/node';
import { z, ZodError } from 'zod';

import { createUser } from '~/api/user.server';

const payload = z.object({
  username: z.string().min(3, 'username too short'),
  password: z.string().min(5, 'password must be at least 5 chars long'),
  passwordRepeat: z.string()
});

type RequestPayload = z.infer<typeof payload>;

export const action = async (args: ActionFunctionArgs) => {
  const { request } = args;

  const data = await request.formData();
  let values: RequestPayload;

  try {
    values = payload.parse(Object.fromEntries(data));
  } catch (e) {
    const err = e as ZodError;
    return { errors: err.issues.map((i) => i.message) };
  }

  if (values.password !== values.passwordRepeat) {
    return { errors: ['password and repeated password are not the same'] };
  }

  const user = await createUser(values.username, values.password);

  if (user) return redirect('/login');
};
