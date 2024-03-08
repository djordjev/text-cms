import { redis } from '~/api/redis/redis.server';
import { FileVariation } from '~/types';
import { parseFileVariations } from '~/utils/file';

const getFileContentByPath = (path: string) => {
  return new Promise<FileVariation[] | null>((resolve, reject) => {
    redis.get(path, (err, result) => {
      if (err) {
        reject(err);
        return;
      }

      if (!result) {
        resolve(null);
        return;
      }

      const parsed = parseFileVariations(result);

      if (!parsed) {
        reject(new Error('incorrect variation format'));
        return;
      }

      resolve(parsed);
    });
  });
};

const storeFileContent = (file: string, content: FileVariation[]) => {
  return new Promise<FileVariation[]>((resolve, reject) => {
    const contentString = JSON.stringify(content);

    redis.set(file, contentString, (err, result) => {
      if (err || !result) {
        reject(err);
        return;
      }

      if (result !== 'OK') {
        reject(new Error('invalid response'));
        return;
      }

      resolve(content);
    });
  });
};

const addVariation = async (path: string, variation: FileVariation) => {
  const content = await getFileContentByPath(path);

  const allVariations = content ?? [];

  allVariations.push(variation);

  await storeFileContent(path, allVariations);

  return allVariations;
};

export { addVariation, getFileContentByPath };
