import { json, LoaderFunctionArgs } from '@remix-run/node';

import { getContentForPath } from '~/api/finder.server';
import { buildErrorResponse } from '~/utils/errors';
import { isFile } from '~/utils/file';
import { auth } from '~/utils/routes';

const loader = async (args: LoaderFunctionArgs) => {
  await auth(args);

  const { params } = args;

  const path = `/${params['*']}`;

  const result = await getContentForPath(path);

  const type = isFile(path) ? 'file' : 'folder';

  if (!result) throw buildErrorResponse(404, `Unable to find the ${type}!`);

  return json(result);
};

export { loader };
