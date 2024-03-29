import { ActionFunctionArgs } from '@remix-run/node';

import { getFileContentByPath, storeFileContent } from '~/api/file.server';
import { FormValues } from '~/types';
import { getStringFormEntry } from '~/utils/form';

const rearrange = async (values: FormValues) => {
  const path = getStringFormEntry(values, 'path');
  const from = getStringFormEntry(values, 'from');
  const to = getStringFormEntry(values, 'to');

  const content = await getFileContentByPath(path);
  if (!content) throw new Error('no file content');

  const activeIndex = content.findIndex((i) => i.id === from);
  const overIndex = content.findIndex((i) => i.id === to);

  content.splice(overIndex, 0, ...content.splice(activeIndex, 1));

  await storeFileContent(path, content);

  return content;
};

const action = async (args: ActionFunctionArgs) => {
  const { request } = args;

  const data = await request.formData();

  const { _action, ...values } = Object.fromEntries(data);

  switch (_action) {
    case 'rearrange':
      return await rearrange(values);
    default:
      throw new Error('unknown action' + _action);
  }
};

export { action };
