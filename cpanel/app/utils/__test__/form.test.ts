import { FormValues } from '~/types';

import { getStringFormEntry } from '../form';

describe('utils/form', () => {
  describe('getStringFormEntry', () => {
    const values: FormValues = {
      stringVal: 'something',
      fileVal: new File([''], 'filename')
    };

    it('returns empty string', () => {
      const result = getStringFormEntry(values, 'not exist');
      expect(result).toBe('');
    });

    it('returns string', () => {
      const result = getStringFormEntry(values, 'stringVal');
      expect(result).toBe('something');
    });

    it('throws an error', () => {
      expect.assertions(1);

      try {
        getStringFormEntry(values, 'fileVal');
      } catch (e) {
        expect((e as Error).message).toBe('Can not read file as string');
      }
    });
  });
});
