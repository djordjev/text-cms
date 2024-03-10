const mocksFinder = vi.hoisted(() => ({ getFileById: vi.fn() }));
const mocksRedis = vi.hoisted(() => ({ getFileContentByPath: vi.fn() }));

vi.mock('~/api/finder.server', () => ({ ...mocksFinder }));
vi.mock('~/api/file.server', () => ({ ...mocksRedis }));

import { FILE_CONTENT } from '~/api/__fixtures__/file';

import { loader } from '../loader';

describe('editor/loader', () => {
  it('returns data', async () => {
    const params: Record<string, string> = {
      fileId: '123',
      variationId: '2'
    };

    const path = '/editor';

    mocksFinder.getFileById.mockResolvedValue({ path });
    mocksRedis.getFileContentByPath.mockResolvedValue(FILE_CONTENT);

    const result = await loader({
      request: new Request('https://test.com'),
      params,
      context: {}
    });

    expect(result).toStrictEqual(FILE_CONTENT[1]);

    expect(mocksFinder.getFileById).toHaveBeenCalledOnce();
    expect(mocksFinder.getFileById).toHaveBeenCalledWith(123);

    expect(mocksRedis.getFileContentByPath).toHaveBeenCalledOnce();
    expect(mocksRedis.getFileContentByPath).toHaveBeenCalledWith(path);
  });
});
