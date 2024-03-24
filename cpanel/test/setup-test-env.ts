import '@testing-library/jest-dom/vitest';

import { installGlobals } from '@remix-run/node';

process.env.SESSION_SECRET = 'secret';
process.env.REDIS_URL = 'redis';

installGlobals();
