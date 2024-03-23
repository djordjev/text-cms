import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from '@remix-run/react';

import { Footer } from '~/components/global/Footer';
import { Header } from '~/components/global/Header';
import { authenticator } from '~/services/auth/auth.server';

import { UserContext } from './context';
import stylesheet from './tailwind.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet }
];

export const loader = async (args: LoaderFunctionArgs) => {
  return authenticator.isAuthenticated(args.request);
};

export default function App() {
  // Data
  const data = useLoaderData<typeof loader>();

  // Setup
  const username = data?.username ?? null;

  return (
    <html lang="en" data-theme="nord">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="u-flex u-flex-col u-min-h-screen">
        <UserContext.Provider value={{ username }}>
          <Header className="u-flex-grow-0 u-flex-shrink-0" />
          <main className="main u-flex u-flex-1 u-p-2x u-bg-base-200">
            <Outlet />
          </main>
          <Footer className="u-flex-grow-0 u-flex-shrink-0" />
        </UserContext.Provider>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
