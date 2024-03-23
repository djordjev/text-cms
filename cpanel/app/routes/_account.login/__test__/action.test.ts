const mocks = vi.hoisted(() => ({ authenticator: { authenticate: vi.fn() } }));
vi.mock('~/services/auth/auth.server', () => ({ ...mocks }));

import { STRATEGY_USER_PASS } from '~/constants';
import { buildRequest } from '~/utils/test';

import { action } from '../action';

describe('route login/actions', () => {
  it('calls authenticate', async () => {
    mocks.authenticator.authenticate.mockResolvedValue('test');

    const request = buildRequest({});

    await action({ request, params: {}, context: {} });

    expect(mocks.authenticator.authenticate).toHaveBeenCalledOnce();
    expect(mocks.authenticator.authenticate).toHaveBeenCalledWith(
      STRATEGY_USER_PASS,
      request,
      {
        successRedirect: '/',
        failureRedirect: '/login'
      }
    );
  });
});
