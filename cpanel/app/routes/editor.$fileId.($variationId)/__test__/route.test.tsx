vi.mock('~/utils/env');

import { createRemixStub } from '@remix-run/testing';
import { render, screen } from '@testing-library/react';

import { FILE_CONTENT } from '~/api/__fixtures__/file';

import Route from '../route';

test('route', async () => {
  const createComponent = () => {
    const RemixStub = createRemixStub([
      {
        path: '/editor/:fileId/:variationId?',
        Component: Route,
        loader: () => {
          return FILE_CONTENT[1];
        }
      }
    ]);

    return <RemixStub initialEntries={['/editor/10']} />;
  };

  const { container } = render(createComponent());

  expect(
    await screen.findByRole('button', { name: 'Save' })
  ).toBeInTheDocument();

  expect(container.childNodes).toMatchSnapshot();
});
