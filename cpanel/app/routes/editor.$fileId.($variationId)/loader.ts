import { LoaderFunctionArgs } from '@remix-run/node';

import { getFileContentByPath } from '~/api/file.server';
import { getFileById } from '~/api/finder.server';
import { FileVariation } from '~/types';
import { buildErrorResponse } from '~/utils/errors';

const loader = async (args: LoaderFunctionArgs) => {
  const { params } = args;

  const fileId = params.fileId;
  const variationId = params.variationId;

  if (!fileId) throw buildErrorResponse(404);

  const fileInfo = await getFileById(Number.parseInt(fileId, 10));

  if (!fileInfo) throw buildErrorResponse(404);

  const file = await getFileContentByPath(fileInfo.path);

  const variation = file?.find((i) => i.id === variationId);

  const response: FileVariation = {
    condition: variation?.condition ?? null,
    id: variation?.id ?? '',
    name: variation?.name ?? '',
    text: variation?.text ?? [{ type: 'paragraph', children: [{ text: '' }] }]
  };

  return response;
};

export { loader };
