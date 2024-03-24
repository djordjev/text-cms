const mocksFinder = vi.hoisted(() => ({
  add: vi.fn(),
  client: { $transaction: vi.fn() },
  getFilesInNode: vi.fn(),
  removeInTx: vi.fn()
}));

const mocksFile = vi.hoisted(() => ({ deleteFiles: vi.fn() }));

vi.mock('~/api/finder.server', () => ({ ...mocksFinder }));
vi.mock('~/api/file.server', () => ({ ...mocksFile }));

import { action } from '../action';

describe('finder.$/action', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

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
    expect(mocksFinder.add).toHaveBeenCalledOnce();
    expect(mocksFinder.add).toHaveBeenCalledWith(
      '/folder1',
      'some-name',
      'new-folder'
    );
  });

  it('runs delete action', async () => {
    const file = '/folder1/folder2/file.txt';
    const filesToDelete = [file];

    const body = new URLSearchParams({ _action: 'delete', node: file });

    mocksFinder.client.$transaction.mockImplementation((cb: any) =>
      cb(mocksFinder.client)
    );

    mocksFinder.getFilesInNode.mockResolvedValue(filesToDelete);

    const request = new Request('https://test.com', { body, method: 'POST' });

    const result = await action({ request, params: {}, context: {} });

    expect(result).toBeNull();

    expect(mocksFinder.removeInTx).toHaveBeenCalledOnce();
    expect(mocksFinder.removeInTx).toHaveBeenCalledWith(
      mocksFinder.client,
      file
    );

    expect(mocksFinder.getFilesInNode).toHaveBeenCalledOnce();
    expect(mocksFinder.getFilesInNode).toHaveBeenCalledWith(file);

    expect(mocksFile.deleteFiles).toHaveBeenCalledOnce();
    expect(mocksFile.deleteFiles).toHaveBeenCalledWith(filesToDelete);
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
