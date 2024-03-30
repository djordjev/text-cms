import { ActionFunctionArgs } from '@remix-run/node';

import { getFileContentByPath, storeFileContent } from '~/api/file.server';
import { getFileById } from '~/api/finder.server';
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

const deleteVariation = async (values: FormValues) => {
  const fileId = getStringFormEntry(values, 'fileId');
  const variation = getStringFormEntry(values, 'variation');

  const info = await getFileById(Number.parseInt(fileId, 10));
  if (!info) throw new Error('no file content');

  const { path } = info;

  const content = await getFileContentByPath(path);
  if (!content) throw new Error('no file content');

  const newContent = content.filter((c) => c.id !== variation);

  await storeFileContent(path, newContent);

  return newContent;
};

const action = async (args: ActionFunctionArgs) => {
  const { request } = args;

  const data = await request.formData();

  const { _action, ...values } = Object.fromEntries(data);

  switch (_action) {
    case 'rearrange':
      return await rearrange(values);
    case 'delete':
      return await deleteVariation(values);
    default:
      throw new Error('unknown action' + _action);
  }
};

export { action };
