import { createRemixStub } from '@remix-run/testing';
import { render, screen } from '@testing-library/react';

import { UserContext } from '~/context';

import { Header, HeaderProps } from '../Header';

describe('Header', () => {
  const props: HeaderProps = {};

  const createComponent = (username: string | null = null) => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => (
          <UserContext.Provider value={{ username }}>
            <Header {...props} />
          </UserContext.Provider>
        )
      }
    ]);

    return <RemixStub />;
  };

  it('renders all links for logged out', () => {
    render(createComponent());

    expect(screen.getByText('TextCMS')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Finder' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Sign In' })).toBeInTheDocument();
  });

  it('renders all links for logged in', () => {
    render(createComponent('djvukovic'));

    expect(screen.getByText('TextCMS')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Finder' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'djvukovic' })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Log out' })).toBeInTheDocument();
  });
});
