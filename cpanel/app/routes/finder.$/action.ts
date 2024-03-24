import { ActionFunctionArgs } from '@remix-run/node';

import { deleteFiles } from '~/api/file.server';
import { add, client, getFilesInNode, removeInTx } from '~/api/finder.server';
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

  await client.$transaction(async (tx) => {
    const filesToDelete = await getFilesInNode(node);

    await removeInTx(tx, node);

    await deleteFiles(filesToDelete);
  });

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
