const mockAuth = vi.hoisted(() => ({ authenticator: { isAuthenticated: vi.fn(), sessionErrorKey: 'errKey' } })); // prettier-ignore
const mockSession = vi.hoisted(() => ({ commitSession: vi.fn(), getSession: vi.fn() })); // prettier-ignore

vi.mock('~/services/auth/auth.server', () => ({ ...mockAuth }));
vi.mock('~/services/auth/session.server', () => ({ ...mockSession }));

import { buildRequest } from '~/utils/test';

import { loader } from '../loader';

describe('route login loader', () => {
  it('returns error', async () => {
    const request = buildRequest({});

    request.headers.set('cookie', 'cookie-header');
    const session = { get: () => 'error-val' };
    const cookieVal = 'cookie-val';

    mockAuth.authenticator.isAuthenticated.mockResolvedValue(null);
    mockSession.getSession.mockResolvedValue(session);
    mockSession.commitSession.mockResolvedValue(cookieVal);

    const result = await loader({ request, params: {}, context: {} });

    const json = await result.json();

    expect(json.error).toBe('error-val');
    expect(result.headers.get('Set-Cookie')).toBe('cookie-val');
  });
});
