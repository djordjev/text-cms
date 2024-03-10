import { ActionFunctionArgs, json, redirect } from '@remix-run/node';

import { addVariation } from '~/api/file.server';
import { getFileById } from '~/api/finder.server';
import { FormValues } from '~/types';
import { parseConditions, parseText } from '~/utils/file';
import { getStringFormEntry } from '~/utils/form';

export const ACTION_UPSERT = 'upsert';

const validateUpsert = (name: string) => {
  const errors: Record<string, string> = {};

  if (!name) errors['name'] = 'You must provide name for the variation';

  return Object.keys(errors).length ? errors : null;
};

const actionUpsertVariation = async (
  fileId: string,
  variationId: string,
  values: FormValues
) => {
  const file = await getFileById(Number.parseInt(fileId));

  if (!file) throw new Error('cant find file to add');

  const { path } = file;

  const name = getStringFormEntry(values, 'name');
  const condition = getStringFormEntry(values, 'condition');
  const text = getStringFormEntry(values, 'text');
  const id = variationId || crypto.randomUUID();

  const errors = validateUpsert(name);

  if (errors) return json({ data: null, errors });

  await addVariation(path, {
    condition: parseConditions(condition),
    id,
    name,
    text: parseText(text)
  });

  return redirect(`/viewer/${file.id}`);
};

const action = async (args: ActionFunctionArgs) => {
  const { params, request } = args;

  const data = await request.formData();
  const fileId = params.fileId;
  const variationId = params.variationId ?? '';

  if (!fileId) throw new Error('no file id');

  const { _action, ...values } = Object.fromEntries(data);

  switch (_action) {
    case ACTION_UPSERT:
      return await actionUpsertVariation(fileId, variationId, values);
    default:
      throw new Error('unknown action');
  }
};

export { action };
