import { ActionFunctionArgs } from '@remix-run/node';

import { add } from '~/api/finder.server';
import { CreateParam } from '~/types';

const actionCreateNode = async (args: ActionFunctionArgs) => {
  const { params, request } = args;

  const path = `/${params['*']}`;

  const data = await request.formData();

  const type = data.get('type') as CreateParam;
  const name = data.get('name') as string;

  add(path, name, type);

  return null;
};

const action = async (args: ActionFunctionArgs) => {
  return await actionCreateNode(args);
};

export { action };
