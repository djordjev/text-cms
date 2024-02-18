import { createRemixStub } from '@remix-run/testing';
import { render, screen } from '@testing-library/react';

import { Footer, FooterProps } from '../Footer';

test('Footer', () => {
  const props: FooterProps = {};

  const TestComponent = createRemixStub([
    {
      path: '/',
      Component: () => <Footer {...props} />
    }
  ]);

  const { container } = render(<TestComponent />);

  expect(screen.getByText(/Djordje Vukovic/)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
    'href',
    'https://github.com/djordjev/text-cms'
  );

  expect(container).toMatchSnapshot();
});
