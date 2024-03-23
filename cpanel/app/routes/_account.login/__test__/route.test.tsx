import { json, LoaderFunction } from '@remix-run/node';
import { createRemixStub } from '@remix-run/testing';
import { render, screen } from '@testing-library/react';

import Route from '../route';

describe('Route', () => {
  const createComponent = (loader: LoaderFunction) => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => <Route />,
        loader
      }
    ]);

    return <RemixStub />;
  };

  it('renders empty form', async () => {
    const loader = () => {
      return json({});
    };

    const { container } = render(createComponent(loader));

    expect(
      await screen.findByRole('textbox', { name: 'username' })
    ).toBeInTheDocument();

    expect(container.childNodes).toMatchSnapshot();
  });

  it('renders error', async () => {
    const loader = () => {
      return json({ error: { message: 'login error' } });
    };

    render(createComponent(loader));

    expect(await screen.findByText('login error')).toBeInTheDocument();
  });
});
