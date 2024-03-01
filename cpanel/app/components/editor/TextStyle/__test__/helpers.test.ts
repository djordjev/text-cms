import { CustomText } from '~/types/editor';

import { getSelectedStyleOption } from '../helpers';

describe('TextStyle/helpers', () => {
  describe('getSelectedStyleOption', () => {
    const children: CustomText[] = [];

    it('returns passed type', () => {
      const result = getSelectedStyleOption({ children, type: 'paragraph' });

      expect(result).toBe('paragraph');
    });

    it('returns formatted string for heading', () => {
      const result = getSelectedStyleOption({
        children,
        level: 2,
        type: 'heading'
      });

      expect(result).toBe('heading_2');
    });
  });
});
