import { redis } from '~/api/redis/redis.server';

const getFileContentByPath = (path: string) => {
  return new Promise<string | null>((resolve, reject) => {
    redis.get(path, (err, result) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(result ?? null);
    });
  });
};

export { getFileContentByPath };
