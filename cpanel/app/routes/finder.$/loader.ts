import { json, LoaderFunctionArgs } from '@remix-run/node';

import { getContentForPath } from '~/api/finder.server';
import { auth } from '~/utils/routes';

const loader = async (args: LoaderFunctionArgs) => {
  await auth(args);

  const { params } = args;

  const path = `/${params['*']}`;

  const result = await getContentForPath(path);

  return json(result);
};

export { loader };
