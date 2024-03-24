import { redis } from '~/api/redis/redis.server';
import { FileVariation } from '~/types';
import { parseFileVariations } from '~/utils/file';

const getFileContentByPath = async (path: string) => {
  try {
    const result = await redis.get(path);

    if (!result) return null;

    const parsed = parseFileVariations(result);
    if (!parsed) throw new Error();

    return parsed;
  } catch {
    throw new Error('incorrect variation format');
  }
};

const storeFileContent = async (path: string, content: FileVariation[]) => {
  const value = JSON.stringify(content);

  try {
    const result = await redis.set(path, value);

    if (result !== 'OK') throw new Error();
  } catch {
    throw new Error('unable to store file');
  }
};

const addVariation = async (path: string, variation: FileVariation) => {
  const content = await getFileContentByPath(path);

  const allVariations = content ?? [];

  const ids = allVariations.map((v) => v.id);
  const index = ids.indexOf(variation.id);

  if (index === -1) {
    allVariations.push(variation);
  } else {
    allVariations[index] = variation;
  }

  await storeFileContent(path, allVariations);

  return allVariations;
};

const deleteFiles = async (paths: string[]) => {
  try {
    await redis.del(...paths);
  } catch {
    throw new Error('unable to delete');
  }
};

export { addVariation, deleteFiles, getFileContentByPath };
