const mocksFinder = vi.hoisted(() => ({ getFileById: vi.fn() }));
const mocksRedis = vi.hoisted(() => ({ addVariation: vi.fn() }));

vi.mock('~/api/finder.server', () => ({ ...mocksFinder }));
vi.mock('~/api/file.server', () => ({ ...mocksRedis }));

import { FILE_CONTENT } from '~/api/__fixtures__/file';
import { BUTTON_ACTION } from '~/constants';
import { buildRequest } from '~/utils/test';

import { action, ACTION_UPSERT } from '../action';

describe('editor/action', () => {
  it('upsert action', async () => {
    const content = FILE_CONTENT[1];
    const path = '/path';

    const params: Record<string, string> = {
      fileId: '123',
      variationId: '2'
    };

    mocksFinder.getFileById.mockResolvedValue({ path });
    mocksRedis.addVariation.mockResolvedValue(null);

    const request = buildRequest({
      name: 'Test Name',
      condition: JSON.stringify(content.condition),
      text: JSON.stringify(content.text),
      [BUTTON_ACTION]: ACTION_UPSERT
    });

    const result = await action({ request, params, context: {} });

    expect(result.status).toBe(302);
  });
});
