const mocks = vi.hoisted(() => ({ getFileById: vi.fn() }));
vi.mock('~/api/finder.server', () => ({ ...mocks }));

import { newNode } from '~/api/__fixtures__/node';

import { loader } from '../loader';

test('editor.$fileId/loader', async () => {
  const response = newNode({
    id: 123,
    name: 'File Name.txt'
  });

  mocks.getFileById.mockResolvedValue(response);
  const params: Record<string, string> = { fileId: '123' };

  const result = await loader({
    request: new Request('https://test.com'),
    params,
    context: {}
  });

  const serialized = await result.json();
  expect(serialized.id).toBe(response.id);
  expect(serialized.name).toBe(response.name);

  expect(mocks.getFileById).toHaveBeenCalledOnce();
  expect(mocks.getFileById).toHaveBeenCalledWith(123);
});
