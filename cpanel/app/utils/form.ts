import { FormValues } from '~/types';

const getStringFormEntry = (values: FormValues, key: string) => {
  const value = values[key];

  if (!value) return '';

  if (value instanceof File) throw new Error('Can not read file as string');

  return value;
};

export { getStringFormEntry };
