vi.mock('~/services/auth/auth.server');

import { buildRequest } from '~/utils/test';

import { loader } from '../loader';

describe('page index loader', () => {
  const result = { response: 'response' };
  const response = { json: () => result };

  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue(response);
  });

  it('fetches data', async () => {
    const request = buildRequest({});

    const result = await loader({ request, params: {}, context: {} });

    expect(result).toStrictEqual(result);

    expect(global.fetch).toHaveBeenCalledOnce();
    expect(global.fetch).toHaveBeenCalledWith('api_endpoint/file/Home.txt', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        logged_in: true,
        username: 'username'
      })
    });
  });
});
