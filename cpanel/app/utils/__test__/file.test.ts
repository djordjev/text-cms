import { getPathFromSegments, isFile, isFolder, isHome } from '../file';

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
});
