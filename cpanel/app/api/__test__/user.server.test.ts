vi.mock('~/api/sql/sql.server');

import { client } from '~/api/sql/__mocks__/sql.server';

import { createUser, getUser } from '../user.server';

describe('user', () => {
  const username = 'username';
  const password = 'password';

  it('creates a new user', async () => {
    await createUser(username, password);

    expect(client.user.create).toHaveBeenCalledOnce();
    expect(client.user.create).toHaveBeenCalledWith({
      data: { username, password }
    });
  });

  it('finds an user', async () => {
    await getUser(username, password);

    expect(client.user.findUnique).toHaveBeenCalledOnce();
    expect(client.user.findUnique).toHaveBeenCalledWith({
      where: { username, password }
    });
  });
});
