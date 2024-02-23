import { json, LoaderFunctionArgs } from '@remix-run/node';

import { getContentForPath } from '~/api/finder.server';

const loader = async (args: LoaderFunctionArgs) => {
  const { params } = args;

  const path = `/${params['*']}`;

  const result = await getContentForPath(path);

  return json(result);
};

export { loader };
