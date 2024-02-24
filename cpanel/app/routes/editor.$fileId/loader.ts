import { json, LoaderFunctionArgs } from '@remix-run/node';

import { getFileById } from '~/api/finder.server';

const loader = async (args: LoaderFunctionArgs) => {
  const { params } = args;

  const id = params.fileId;

  if (!id) throw new Error('unable to find file');

  const result = await getFileById(Number.parseInt(id, 10));

  return json(result);
};

export { loader };
