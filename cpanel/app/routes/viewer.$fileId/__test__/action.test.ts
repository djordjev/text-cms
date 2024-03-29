const mocks = vi.hoisted(() => ({ getFileContentByPath: vi.fn(), storeFileContent: vi.fn() })); // prettier-ignore
vi.mock('~/api/file.server', () => ({ ...mocks }));

import cloneDeep from 'lodash/cloneDeep';

import { FILE_CONTENT } from '~/api/__fixtures__/file';
import { BUTTON_ACTION } from '~/constants';
import { FileVariation } from '~/types';
import { buildRequest, TEST_EDITOR } from '~/utils/test';

import { action } from '../action';

describe('viewer/action', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('rearrange action', () => {
    let content: FileVariation[];

    const path = '/path.txt';

    const third = {
      id: '3',
      name: 'Third Variation',
      condition: [[['n', '=', '11']]],
      text: TEST_EDITOR
    };

    const [first, second] = FILE_CONTENT;

    beforeEach(() => {
      content = cloneDeep([...FILE_CONTENT, third]) as any;

      mocks.getFileContentByPath.mockResolvedValue(content);
      mocks.storeFileContent.mockResolvedValue({});
    });

    it('moves last element to first position', async () => {
      const request = buildRequest({
        [BUTTON_ACTION]: 'rearrange',
        path,
        from: '3',
        to: '1'
      });

      await action({ request, params: {}, context: {} });

      expect(mocks.storeFileContent).toHaveBeenCalledOnce();
      expect(mocks.storeFileContent).toHaveBeenCalledWith(path, [
        third,
        first,
        second
      ]);
    });

    it('moves first element to last position', async () => {
      const request = buildRequest({
        [BUTTON_ACTION]: 'rearrange',
        path,
        from: '1',
        to: '3'
      });

      await action({ request, params: {}, context: {} });

      expect(mocks.storeFileContent).toHaveBeenCalledOnce();
      expect(mocks.storeFileContent).toHaveBeenCalledWith(path, [
        second,
        third,
        first
      ]);
    });

    it('moves moves first to second position', async () => {
      const request = buildRequest({
        [BUTTON_ACTION]: 'rearrange',
        path,
        from: '1',
        to: '2'
      });

      await action({ request, params: {}, context: {} });

      expect(mocks.storeFileContent).toHaveBeenCalledOnce();
      expect(mocks.storeFileContent).toHaveBeenCalledWith(path, [
        second,
        first,
        third
      ]);
    });
  });
});
