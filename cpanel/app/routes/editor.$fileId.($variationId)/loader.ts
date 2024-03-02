import { LoaderFunctionArgs } from '@remix-run/node';

import { getFileContentByPath } from '~/api/file.server';
import { getFileById } from '~/api/finder.server';

const loader = async (args: LoaderFunctionArgs) => {
  const { params } = args;

  const fileId = params.fileId;
  const variationId = params.variationId;

  if (!variationId || !fileId) return null;

  const fileInfo = await getFileById(Number.parseInt(fileId, 10));

  const file = await getFileContentByPath(fileInfo.path);

  if (!file) throw new Error('no file');

  const parsed = JSON.parse(file) as {
    id: string;
    condition: string;
    content: string;
  }[];

  return parsed.find((i) => i.id === variationId);
};

export { loader };
