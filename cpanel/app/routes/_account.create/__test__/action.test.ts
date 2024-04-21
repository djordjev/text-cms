const mocks = vi.hoisted(() => ({ createUser: vi.fn() }));
vi.mock('~/api/user.server', () => ({ ...mocks }));

import { buildRequest } from '~/utils/test';

import { action } from '../action';

describe('create account', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('returns error if payload data is invalid', async () => {
    const request = buildRequest({
      username: 'a',
      password: 'b',
      passwordRepeat: 'c'
    });

    const result = await action({ request, params: {}, context: {} });

    if (!(result && 'errors' in result)) throw new Error('response error');

    expect(result.errors).toStrictEqual([
      'username too short',
      'password must be at least 5 chars long'
    ]);
  });

  it('returns error when passwords dont match', async () => {
    const request = buildRequest({
      username: 'username',
      password: 'password',
      passwordRepeat: 'different password'
    });

    const result = await action({ request, params: {}, context: {} });

    if (!(result && 'errors' in result)) throw new Error('response err');

    expect(result.errors).toStrictEqual([
      'password and repeated password are not the same'
    ]);
  });

  it('redirects to finder page if success', async () => {
    const request = buildRequest({
      username: 'username',
      password: 'password',
      passwordRepeat: 'password'
    });

    mocks.createUser.mockResolvedValue({ username: 'username' });

    const result = (await action({
      request,
      params: {},
      context: {}
    })) as Response;

    // expect(result).toEqual(redirect('/finder', ));

    expect(result.status).toBe(302);
    expect(result.headers.get('Location')).toBe('/finder');
  });
});
