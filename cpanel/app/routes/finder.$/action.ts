import { ActionFunctionArgs } from '@remix-run/node';

import { add, remove } from '~/api/finder.server';
import { FormValues } from '~/types';
import { getStringFormEntry } from '~/utils/form';

const actionCreateNode = async (path: string, values: FormValues) => {
  const type = getStringFormEntry(values, 'type');
  const name = getStringFormEntry(values, 'name');

  await add(path, name, type);

  return null;
};

const actionDeleteNode = async (values: FormValues) => {
  const node = getStringFormEntry(values, 'node');

  await remove(node);

  return null;
};

const action = async (args: ActionFunctionArgs) => {
  const { params, request } = args;
  const data = await request.formData();

  const { _action, ...values } = Object.fromEntries(data);
  const path = `/${params['*']}`;

  switch (_action) {
    case 'create':
      return await actionCreateNode(path, values);
    case 'delete':
      return await actionDeleteNode(values);
    default:
      throw new Error('Unknown action');
  }
};

export { action };
