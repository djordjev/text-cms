vi.mock('~/api/sql/sql.server');

import { newNode } from '~/api/__fixtures__/node';
import { client } from '~/api/sql/__mocks__/sql.server';

import {
  add,
  getContentForPath,
  getFileById,
  getFilesInNode,
  removeInTx
} from '../finder.server';

describe('finder', () => {
  describe('remove', () => {
    it('calls remove from db', async () => {
      const file = 'test-file-name';

      await removeInTx(client, file);

      expect(client.fsNode.delete).toHaveBeenCalledOnce();
      expect(client.fsNode.delete).toHaveBeenCalledWith({
        where: { path: file }
      });
    });
  });

  describe('getContentForPath', () => {
    const path = '/folder/folder2';

    it('returns null when not found', async () => {
      client.fsNode.findFirst.mockResolvedValue(null);

      const result = await getContentForPath(path);

      expect(result).toBeNull();
    });

    it('returns folders from db', async () => {
      const dbNodes = newNode({ id: 1 }, [{ id: 2 }, { id: 3 }]);

      client.fsNode.findFirst.mockResolvedValue(dbNodes);

      const result = await getContentForPath(path);

      expect(result).toEqual(dbNodes.children);
      expect(client.fsNode.findFirst).toHaveBeenCalledOnce();
      expect(client.fsNode.findFirst).toHaveBeenCalledWith({
        where: { path },
        include: { children: true }
      });
    });
  });

  describe('add', () => {
    it('creates file', async () => {
      const path = '/';
      const name = 'somename';
      const type = 'new-file';

      const parent = newNode({ id: 1, path: '/', name: '/' });
      const newFile = newNode({ id: 2, path, name: 'somename.txt' });
      const fileType = { id: 2, name: 'file' };

      client.fsNodeType.findFirstOrThrow.mockResolvedValue(fileType);
      client.fsNode.findFirst.mockResolvedValue(parent);
      client.fsNode.create.mockResolvedValue(newFile);

      const result = await add(path, name, type);

      expect(result).toBe(newFile);

      expect(client.fsNode.create).toHaveBeenCalledOnce();
      expect(client.fsNode.create).toHaveBeenCalledWith({
        data: {
          name: 'somename.txt',
          parent: { connect: parent },
          path: '/somename.txt',
          type: { connect: fileType }
        }
      });
    });

    it('creates folder', async () => {
      const path = '/';
      const name = 'somename';
      const type = 'new-folder';

      const parent = newNode({ id: 1, path: '/', name: '/' });
      const newFolder = newNode({ id: 2, path, name: 'somename' });
      const folderType = { id: 1, name: 'folder' };

      client.fsNodeType.findFirstOrThrow.mockResolvedValue(folderType);
      client.fsNode.findFirst.mockResolvedValue(parent);
      client.fsNode.create.mockResolvedValue(newFolder);

      const result = await add(path, name, type);

      expect(result).toBe(newFolder);

      expect(client.fsNode.create).toHaveBeenCalledOnce();
      expect(client.fsNode.create).toHaveBeenCalledWith({
        data: {
          name: 'somename',
          parent: { connect: parent },
          path: '/somename',
          type: { connect: folderType }
        }
      });
    });
  });

  describe('getFileById', () => {
    it('returns file by id', async () => {
      const node = newNode({ id: 10, name: 'test name.txt' });
      client.fsNode.findFirst.mockResolvedValue(node);

      const result = await getFileById(10);

      expect(result?.id).toBe(node.id);
      expect(result?.name).toBe(node.name);
    });

    it('returns null when not found', async () => {
      client.fsNode.findFirst.mockResolvedValue(null);

      expect.assertions(1);

      const result = await getFileById(10);
      expect(result).toBeNull();
    });
  });

  describe('getFilesInNode', () => {
    it('returns file when file is passed', async () => {
      const file = '/home/file.txt';

      const result = await getFilesInNode(file);

      expect(result).toStrictEqual([file]);
    });

    it('returns child files when folder is passed', async () => {
      const path = '/home';

      const files = [
        newNode({ path: 'a.txt' }),
        newNode({ path: 'b.txt' }),
        newNode({ path: 'c.txt' })
      ];

      client.fsNode.findMany.mockResolvedValue(files);

      const result = await getFilesInNode(path);

      expect(result).toStrictEqual(['a.txt', 'b.txt', 'c.txt']);

      expect(client.fsNode.findMany).toHaveBeenCalledOnce();
      expect(client.fsNode.findMany).toHaveBeenCalledWith({
        where: {
          path: {
            startsWith: path,
            endsWith: '.txt'
          }
        }
      });
    });
  });
});
