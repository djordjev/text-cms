import { client } from '~/api/sql/sql.server';

const createUser = async (username: string, password: string) => {
  return client.user.create({ data: { username, password } });
};

const getUser = async (username: string, password: string) => {
  return client.user.findUnique({
    where: { username, password }
  });
};

export { createUser, getUser };
