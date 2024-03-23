import { createRemixStub } from '@remix-run/testing';
import { render } from '@testing-library/react';

import Route from '../route';

test('route', () => {
  const createComponent = () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => <Route />
      }
    ]);

    return <RemixStub />;
  };

  const { container } = render(createComponent());

  expect(container.childNodes).toMatchSnapshot();
});
