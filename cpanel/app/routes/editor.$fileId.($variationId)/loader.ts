import { LoaderFunctionArgs } from '@remix-run/node';

import { getFileContentByPath } from '~/api/file.server';
import { getFileById } from '~/api/finder.server';
import { FileVariation } from '~/types';

const loader = async (args: LoaderFunctionArgs) => {
  const { params } = args;

  const fileId = params.fileId;
  const variationId = params.variationId;

  if (!fileId) return null;

  const fileInfo = await getFileById(Number.parseInt(fileId, 10));

  const file = await getFileContentByPath(fileInfo.path);

  if (!file) {
    const empty: Partial<FileVariation> = {
      condition: undefined,
      id: undefined,
      name: '',
      text: undefined
    };

    return empty;
  }

  const variation = file.find((i) => i.id === variationId);

  const response = {
    name: variation?.name
  };

  return response;
};

export { loader };
