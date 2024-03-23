const mocks = vi.hoisted(() => ({ authenticator: { logout: vi.fn() } }));
vi.mock('~/services/auth/auth.server', () => ({ ...mocks }));

import { action } from '../action';

describe('logout action', () => {
  it('calls logout', async () => {
    const request = new Request('https://test.com');

    await action({ request } as any);

    expect(mocks.authenticator.logout).toHaveBeenCalledOnce();
    expect(mocks.authenticator.logout).toHaveBeenCalledWith(request, {
      redirectTo: '/'
    });
  });
});
