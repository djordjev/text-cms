import { createRemixStub } from '@remix-run/testing';
import { render, screen } from '@testing-library/react';

import Route from '../route';

test('Route', () => {
  const createComponent = () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => <Route />,
        action: () => {
          return {};
        }
      }
    ]);

    return <RemixStub />;
  };

  const { container } = render(createComponent());

  expect(screen.getByRole('textbox', { name: 'username' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Sign Up' })).toBeInTheDocument();

  expect(container.childNodes).toMatchSnapshot();
});
