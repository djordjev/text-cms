import type { LinksFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from '@remix-run/react';

import { Footer } from '~/components/global/Footer';
import { Header } from '~/components/global/Header';

import stylesheet from './tailwind.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet }
];

export default function App() {
  return (
    <html lang="en" data-theme="nord">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="u-flex u-flex-col u-min-h-screen">
        <Header className="u-flex-grow-0 u-flex-shrink-0" />
        <main className="main u-flex u-flex-1 u-p-2x u-bg-base-200">
          <Outlet />
        </main>
        <Footer className="u-flex-grow-0 u-flex-shrink-0" />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
