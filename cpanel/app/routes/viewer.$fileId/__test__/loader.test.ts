const mocks = vi.hoisted(() => ({ getFileById: vi.fn() }));
const mocksRedis = vi.hoisted(() => ({ getFileContentByPath: vi.fn() }));

vi.mock('~/api/finder.server', () => ({ ...mocks }));
vi.mock('~/api/file.server', () => ({ ...mocksRedis }));
vi.mock('~/services/auth/auth.server');

import { newNode } from '~/api/__fixtures__/node';

import { loader } from '../loader';

test('editor.$fileId/loader', async () => {
  const path = '/some/file/path/File Name.txt';
  const response = newNode({ id: 123, path, name: 'File Name.txt' });
  const content = {
    conditions: 'some cond',
    content: { file: 'content' },
    id: 'uuid'
  };

  mocks.getFileById.mockResolvedValue(response);
  mocksRedis.getFileContentByPath.mockResolvedValue(content);

  const params: Record<string, string> = { fileId: '123' };

  const result = await loader({
    request: new Request('https://test.com'),
    params,
    context: {}
  });

  const serialized = await result.json();

  expect(serialized.info.id).toBe(response.id);
  expect(serialized.info.name).toBe(response.name);
  expect(serialized.info.path).toBe(response.path);

  expect(serialized.variations).toStrictEqual(content);

  expect(mocks.getFileById).toHaveBeenCalledOnce();
  expect(mocks.getFileById).toHaveBeenCalledWith(123);

  expect(mocksRedis.getFileContentByPath).toHaveBeenCalledOnce();
  expect(mocksRedis.getFileContentByPath).toHaveBeenCalledWith(path);
});
