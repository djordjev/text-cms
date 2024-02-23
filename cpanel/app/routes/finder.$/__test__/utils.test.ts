import { getCreateOpenModal } from '../utils';

describe('finder.$/utils', () => {
  it('getCreateOpenModal return action', () => {
    const params = new URLSearchParams({ action: 'new-file' });
    const result = getCreateOpenModal(params);
    expect(result).toBe('new-file');
  });

  it('getCreateOpenModal returns null', () => {
    const params = new URLSearchParams({ action: 'unknown' });
    const result = getCreateOpenModal(params);
    expect(result).toBeNull();
  });
});
