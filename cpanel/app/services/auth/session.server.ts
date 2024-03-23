import { createCookieSessionStorage } from '@remix-run/node';

const secret = process.env.SESSION_SECRET;
if (!secret) throw new Error('cant load secret');

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '_session',
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secrets: [secret],
    secure: process.env.NODE_ENV === 'production'
  }
});

export const { getSession, commitSession, destroySession } = sessionStorage;
