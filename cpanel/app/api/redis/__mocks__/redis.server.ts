import Redis from 'ioredis';
import { beforeEach } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';

beforeEach(() => {
  mockReset(redis);
});

const redis = mockDeep<Redis>();
export { redis };
