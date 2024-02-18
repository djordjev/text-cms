import { createRemixStub } from '@remix-run/testing';
import { render, screen } from '@testing-library/react';

import { Header, HeaderProps } from '../Header';

describe('Header', () => {
  const props: HeaderProps = {};

  const TestComponent = createRemixStub([
    {
      path: '/',
      Component: () => <Header {...props} />
    }
  ]);

  it('renders all links', () => {
    render(<TestComponent />);

    expect(screen.getByText('TextCMS')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Finder' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Account' })).toBeInTheDocument();
  });
});
