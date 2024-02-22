import { CreateParam } from '~/types';

const getCreateOpenModal = (params: URLSearchParams): CreateParam | null => {
  const param = params.get('action');

  if (param === 'new-file' || param === 'new-folder') return param;

  return null;
};

export { getCreateOpenModal };
