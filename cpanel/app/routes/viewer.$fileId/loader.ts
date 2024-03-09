import { json, LoaderFunctionArgs } from '@remix-run/node';

import { getFileContentByPath } from '~/api/file.server';
import { getFileById } from '~/api/finder.server';
import { buildErrorResponse } from '~/utils/errors';

const loader = async (args: LoaderFunctionArgs) => {
  const { params } = args;

  const id = params.fileId;

  if (!id) throw buildErrorResponse(404, 'Unable to find the file!');

  const info = await getFileById(Number.parseInt(id, 10));

  if (!info) throw buildErrorResponse(404, 'Unable to find the file!');

  const variations = await getFileContentByPath(info.path);

  if (!variations) throw new Error('Error 500');

  return json({ info, variations });
};

export { loader };
