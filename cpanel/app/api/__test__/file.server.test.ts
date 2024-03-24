vi.mock('~/api/redis/redis.server');

import { FILE_CONTENT, FILE_VARIATION } from '~/api/__fixtures__/file';
import { redis } from '~/api/redis/__mocks__/redis.server';
import { FileVariation } from '~/types';

import {
  addVariation,
  deleteFiles,
  getFileContentByPath
} from '../file.server';

describe('file', () => {
  const path = '/folder1/file.txt';

  const newVar: FileVariation = {
    condition: null,
    id: '3',
    name: 'Third Variation',
    text: [{ type: 'paragraph', children: [{ text: 'Random text' }] }]
  };

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('addVariation', () => {
    it('adds new variation', async () => {
      redis.get.mockResolvedValue(FILE_VARIATION);
      redis.set.mockResolvedValue('OK');

      const result = await addVariation(path, newVar);

      expect(result).toHaveLength(3);

      expect(result[2]).toStrictEqual(newVar);
    });

    it('updates existing variation', async () => {
      redis.get.mockResolvedValue(FILE_VARIATION);
      redis.set.mockResolvedValue('OK');

      const updateVar = { ...newVar, id: FILE_CONTENT[0].id };

      const result = await addVariation(path, updateVar);

      expect(result).toHaveLength(2);
      expect(result[0]).toStrictEqual(updateVar);
    });

    it('throws an error when file not found', async () => {
      redis.get.mockRejectedValue(new Error());

      expect.assertions(1);

      try {
        await addVariation(path, newVar);
      } catch (e) {
        expect((e as any).message).toBe('incorrect variation format');
      }
    });
  });

  describe('deleteFiles', () => {
    it('deletes files', async () => {
      redis.del.mockResolvedValue(1);

      await deleteFiles(['a', 'b', 'c']);

      expect(redis.del).toHaveBeenCalledOnce();
      expect(redis.del).toHaveBeenCalledWith('a', 'b', 'c');
    });
  });

  describe('getFileContentByPath', () => {
    it('returns file content', async () => {
      redis.get.mockResolvedValue(FILE_VARIATION);

      const result = await getFileContentByPath(path);

      expect(result).toHaveLength(2);

      const [first, second] = result!;

      expect(first.id).toBe(FILE_CONTENT[0].id);
      expect(first.name).toBe(FILE_CONTENT[0].name);
      expect(first.condition).toStrictEqual(FILE_CONTENT[0].condition);
      expect(first.text).toStrictEqual(FILE_CONTENT[0].text);

      expect(second.id).toBe(FILE_CONTENT[1].id);
      expect(second.name).toBe(FILE_CONTENT[1].name);
      expect(second.condition).toStrictEqual(FILE_CONTENT[1].condition);
      expect(second.text).toStrictEqual(FILE_CONTENT[1].text);
    });

    it('resolves to null when not found', async () => {
      redis.get.mockResolvedValue(null);

      const result = await getFileContentByPath(path);

      expect(result).toBeNull();
    });

    it('throws an error when file content is in incorrect format', async () => {
      const error = new Error();
      redis.get.mockRejectedValue(error);

      expect.assertions(1);

      try {
        await getFileContentByPath(path);
      } catch (e) {
        expect((e as any).message).toBe('incorrect variation format');
      }
    });
  });
});
