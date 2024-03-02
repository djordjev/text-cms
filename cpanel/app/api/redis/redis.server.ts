import Redis from 'ioredis';

import { readEnvVariable } from '~/utils/env';
const redis = new Redis(readEnvVariable('REDIS_URL'));

export { redis };
