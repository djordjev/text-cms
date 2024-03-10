import { expect } from 'vitest';

import { FILE_CONTENT } from '~/api/__fixtures__/file';
import { TEST_EDITOR } from '~/utils/test';

import {
  getPathFromSegments,
  isFile,
  isFolder,
  isHome,
  parseConditions,
  parseFileVariations,
  parseText
} from '../file';

describe('utils/file', () => {
  describe('isHome', () => {
    it('returns true', () => {
      const result = isHome('finder');
      expect(result).toBe(true);
    });

    it('returns false', () => {
      const result = isHome('NOThome');
      expect(result).toBe(false);
    });
  });

  describe('isFile', () => {
    it('returns true', () => {
      expect(isFile('test.txt')).toBe(true);
    });

    it('returns false', () => {
      expect(isFile('test')).toBe(false);
    });
  });

  describe('isFolder', () => {
    it('returns true', () => {
      expect(isFolder('test')).toBe(true);
    });

    it('returns false', () => {
      expect(isFolder('test.txt')).toBe(false);
    });
  });

  describe('getPathFromSegments', () => {
    const segments = ['finder', 'folder1', 'folder2', 'text.txt'];

    it('returns /finder for home', () => {
      const result = getPathFromSegments(segments, 'finder');
      expect(result).toBe('/finder');
    });

    it('returns full path', () => {
      const result = getPathFromSegments(segments, 'text.txt');
      expect(result).toBe('/finder/folder1/folder2/text.txt');
    });
  });

  describe('parseConditions', () => {
    it('returns null if conditions not provided', () => {
      const result = parseConditions('');
      expect(result).toBeNull();
    });

    it('returns parsed conditions', () => {
      const conditions = JSON.stringify(FILE_CONTENT[1].condition);

      const result = parseConditions(conditions);

      expect(result).toStrictEqual(FILE_CONTENT[1].condition);
    });

    it('returns null if unable to parse', () => {
      const conditions = `[[["a", "X", "3"]]]`;

      const result = parseConditions(conditions);

      expect(result).toBeNull();
    });
  });

  describe('parseText', () => {
    it('returns parsed text', () => {
      const text = JSON.stringify(TEST_EDITOR);

      const result = parseText(text);

      expect(result).toStrictEqual(TEST_EDITOR);
    });

    it('throws an error when unable to parse', () => {
      expect.assertions(1);

      try {
        parseText('{}');
      } catch (e) {
        expect((e as any).message).toBe('invalid text format');
      }
    });
  });

  describe('parseFileVariations', () => {
    it('parses variations', () => {
      const file = JSON.stringify([FILE_CONTENT[1]]);

      const result = parseFileVariations(file);

      expect(result).toStrictEqual([FILE_CONTENT[1]]);
    });

    it('returns null if required fields are missing', () => {
      const content = { ...FILE_CONTENT[1], name: null };
      const file = JSON.stringify(content);

      const result = parseFileVariations(file);

      expect(result).toBeNull();
    });
  });
});
