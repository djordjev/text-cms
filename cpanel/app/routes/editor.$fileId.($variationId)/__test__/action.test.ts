const mocksFinder = vi.hoisted(() => ({ getFileById: vi.fn() }));
const mocksRedis = vi.hoisted(() => ({ addVariation: vi.fn() }));

vi.mock('~/api/finder.server', () => ({ ...mocksFinder }));
vi.mock('~/api/file.server', () => ({ ...mocksRedis }));

import { FILE_CONTENT } from '~/api/__fixtures__/file';
import { BUTTON_ACTION } from '~/constants';

import { action, ACTION_UPSERT } from '../action';

describe.skip('editor/action', () => {
  it('upsert action', async () => {
    const content = FILE_CONTENT[1];
    const path = '/path';

    const params: Record<string, string> = {
      fileId: '123',
      variationId: '2'
    };

    const formData = new FormData();
    formData.append('name', 'Test Name');
    formData.append('condition', JSON.stringify(content.condition));
    formData.append('text', JSON.stringify(content.text));
    formData.append(BUTTON_ACTION, ACTION_UPSERT);

    mocksFinder.getFileById.mockResolvedValue({ path });
    mocksRedis.addVariation.mockResolvedValue(null);

    const request = new Request('https://test.com', {
      body: formData,
      method: 'POST'
    });

    const result = await action({ request, params, context: {} });

    expect(result.status).toBe(301);
  });
});
