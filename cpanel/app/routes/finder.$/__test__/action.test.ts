const mocks = vi.hoisted(() => ({ add: vi.fn(), remove: vi.fn() }));
vi.mock('~/api/finder.server', () => ({ ...mocks }));

import { action } from '../action';

describe('finder.$/action', () => {
  it('runs add action', async () => {
    const body = new URLSearchParams({
      _action: 'create',
      type: 'new-folder',
      name: 'some-name'
    });

    const request = new Request('https://test.com', { body, method: 'POST' });

    const params: Record<string, string> = {};
    params['*'] = 'folder1';

    const result = await action({ request, params, context: {} });

    expect(result).toBeNull();
    expect(mocks.add).toHaveBeenCalledOnce();
    expect(mocks.add).toHaveBeenCalledWith(
      '/folder1',
      'some-name',
      'new-folder'
    );
  });

  it('runs delete action', async () => {
    const body = new URLSearchParams({
      _action: 'delete',
      node: '/folder1/folder2/file.txt'
    });

    const request = new Request('https://test.com', { body, method: 'POST' });

    const result = await action({ request, params: {}, context: {} });

    expect(result).toBeNull();
    expect(mocks.remove).toHaveBeenCalledOnce();
    expect(mocks.remove).toHaveBeenCalledWith('/folder1/folder2/file.txt');
  });

  it('throws error', async () => {
    const body = new URLSearchParams({ _action: 'unknown' });
    const request = new Request('https://test.com', { body, method: 'POST' });

    expect.assertions(1);

    try {
      await action({ request, params: {}, context: {} });
    } catch (e) {
      expect((e as Error).message).toBe('Unknown action');
    }
  });
});
