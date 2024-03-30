import { storeFileContent } from '~/api/file.server';

const mocks = vi.hoisted(() => ({ getFileContentByPath: vi.fn(), storeFileContent: vi.fn() })); // prettier-ignore
const folderMocks = vi.hoisted(() => ({ getFileById: vi.fn() }));

vi.mock('~/api/file.server', () => ({ ...mocks }));
vi.mock('~/api/finder.server', () => ({ ...folderMocks }));

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

  describe('delete action', () => {
    const path = '/path.txt';

    it('deletes variation', async () => {
      const request = buildRequest({
        [BUTTON_ACTION]: 'delete',
        fileId: '1',
        variation: '1'
      });

      folderMocks.getFileById.mockResolvedValue({ path });
      mocks.getFileContentByPath.mockResolvedValue(FILE_CONTENT);
      mocks.storeFileContent.mockResolvedValue({});

      const result = await action({ request, params: {}, context: {} });

      expect(folderMocks.getFileById).toHaveBeenCalledOnce();
      expect(folderMocks.getFileById).toHaveBeenCalledWith(1);

      expect(mocks.getFileContentByPath).toHaveBeenCalledOnce();
      expect(mocks.getFileContentByPath).toHaveBeenCalledWith(path);

      const expected = [FILE_CONTENT[1]];

      expect(mocks.storeFileContent).toHaveBeenCalledOnce();
      expect(mocks.storeFileContent).toHaveBeenCalledWith(path, expected);

      expect(result).toStrictEqual(expected);
    });

    it('throws an error', async () => {
      const request = buildRequest({
        [BUTTON_ACTION]: 'delete',
        fileId: '1',
        variation: '1'
      });

      folderMocks.getFileById.mockResolvedValue(null);

      expect.assertions(1);

      try {
        await action({ request, params: {}, context: {} });
      } catch (e) {
        const err = e as Error;
        expect(err.message).toBe('no file content');
      }
    });
  });
});
