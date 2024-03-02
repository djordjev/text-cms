import { createRemixStub } from '@remix-run/testing';
import { render, screen } from '@testing-library/react';

import Route from '../route';

test('route', () => {
  const createComponent = () => {
    const RemixStub = createRemixStub([
      {
        path: '/editor/:fileId/:variationId?',
        Component: Route
      }
    ]);

    return <RemixStub initialEntries={['/editor/10']} />;
  };

  const { container } = render(createComponent());

  expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();

  expect(container.childNodes).toMatchSnapshot();
});
