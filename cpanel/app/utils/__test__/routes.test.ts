const mocks = vi.hoisted(() => ({ authenticator: { isAuthenticated: vi.fn() }})); // prettier-ignore
vi.mock('~/services/auth/auth.server', () => ({ ...mocks }));

import { auth } from '../routes';

describe('utils/auth', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('calls isAuthenticated with correct data', async () => {
    const request = new Request('https://www.test.com/callback');

    await auth({ request, params: {}, context: {} });

    expect(mocks.authenticator.isAuthenticated).toHaveBeenCalledOnce();
    expect(mocks.authenticator.isAuthenticated).toHaveBeenCalledWith(request, {
      failureRedirect: '/login?redirect=https%3A%2F%2Fwww.test.com%2Fcallback'
    });
  });
});
