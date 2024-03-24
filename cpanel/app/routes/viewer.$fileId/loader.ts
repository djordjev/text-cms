import { json, LoaderFunctionArgs } from '@remix-run/node';

import { getFileContentByPath } from '~/api/file.server';
import { getFileById } from '~/api/finder.server';
import { buildErrorResponse } from '~/utils/errors';
import { auth } from '~/utils/routes';

const loader = async (args: LoaderFunctionArgs) => {
  await auth(args);

  const { params } = args;

  const id = params.fileId;

  if (!id) throw buildErrorResponse(404, 'Unable to find the file!');

  const info = await getFileById(Number.parseInt(id, 10));

  if (!info) throw buildErrorResponse(404, 'Unable to find the file!');

  const variations = await getFileContentByPath(info.path);

  return json({ info, variations: variations ?? [] });
};

export { loader };
