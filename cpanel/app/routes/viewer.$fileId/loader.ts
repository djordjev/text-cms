import { json, LoaderFunctionArgs } from '@remix-run/node';

import { getFileContentByPath } from '~/api/file.server';
import { getFileById } from '~/api/finder.server';

const loader = async (args: LoaderFunctionArgs) => {
  const { params } = args;

  const id = params.fileId;

  if (!id) throw new Error('unable to find file');

  const info = await getFileById(Number.parseInt(id, 10));

  const variations = await getFileContentByPath(info.path);

  return json({ info, variations });
};

export { loader };
