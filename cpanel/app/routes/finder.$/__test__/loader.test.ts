const mocks = vi.hoisted(() => ({ getContentForPath: vi.fn() }));
vi.mock('~/api/finder.server', () => ({ ...mocks }));

import { newNode } from '~/api/__fixtures__/node';

import { loader } from '../loader';

test('finder.$/loader', async () => {
  const nodes = [newNode({ id: 1 }), newNode({ id: 2 })];

  mocks.getContentForPath.mockResolvedValue(nodes);
  const params: Record<string, string> = {};
  params['*'] = '/';

  const result = await loader({
    request: new Request('https://app.com/path'),
    params,
    context: {}
  });

  const serialized = await result.json();
  expect(serialized).toHaveLength(2);
  expect(serialized[0].id).toBe(nodes[0].id);
  expect(serialized[1].id).toBe(nodes[1].id);
});
