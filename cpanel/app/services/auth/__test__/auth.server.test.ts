const mocks = vi.hoisted(() => ({ getUser: vi.fn(), sessionStorage: null }));

vi.mock('~/api/user.server', () => ({ getUser: mocks.getUser }));
vi.mock('~/services/auth/session.server', () => ({ sessionStorage: mocks.sessionStorage })); // prettier-ignore

import { loginCallback } from '../auth.server';

describe('loginCallback', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('returns an error when incorrect data is provided', async () => {
    const form = new FormData();
    form.append('username', 'a');
    form.append('password', 'b');

    expect.assertions(1);

    try {
      await loginCallback(form);
    } catch (e) {
      const err = e as Error;
      expect(err.message).toBe('incorrect username');
    }
  });

  it('returns error when user is not found in the database', async () => {
    const username = 'longenough';
    const password = 'longenougpassword';

    const form = new FormData();
    form.append('username', username);
    form.append('password', password);

    mocks.getUser.mockResolvedValue(null);

    expect.assertions(3);

    try {
      await loginCallback(form);
    } catch (e) {
      const err = e as Error;
      expect(err.message).toBe('invalid username or password');
    }

    expect(mocks.getUser).toHaveBeenCalledOnce();
    expect(mocks.getUser).toHaveBeenCalledWith(username, password);
  });

  it('returns correct username', async () => {
    const username = 'longenough';
    const password = 'longenougpassword';

    const form = new FormData();
    form.append('username', username);
    form.append('password', password);

    mocks.getUser.mockResolvedValue({ username });

    expect.assertions(3);

    const result = await loginCallback(form);

    expect(result.username).toBe(username);

    expect(mocks.getUser).toHaveBeenCalledOnce();
    expect(mocks.getUser).toHaveBeenCalledWith(username, password);
  });
});
