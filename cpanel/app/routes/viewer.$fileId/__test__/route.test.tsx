vi.mock('~/utils/env');

import { createRemixStub } from '@remix-run/testing';
import { render, screen } from '@testing-library/react';

import { FILE_CONTENT } from '~/api/__fixtures__/file';
import { newNode } from '~/api/__fixtures__/node';

import Viewer from '../route';

test('viewer route', async () => {
  const createComponent = () => {
    const RemixStub = createRemixStub([
      {
        path: '/viewer/:fileId',
        Component: Viewer,
        loader: () => {
          return {
            info: newNode({ id: 22, name: 'File 1' }),
            variations: FILE_CONTENT
          };
        }
      }
    ]);

    return <RemixStub initialEntries={['/viewer/22']} />;
  };

  const { container } = render(createComponent());

  expect(
    await screen.findByRole('link', { name: 'Add new variation' })
  ).toBeInTheDocument();

  FILE_CONTENT.forEach((fc) =>
    expect(screen.getByText(fc.name)).toBeInTheDocument()
  );

  expect(container.childNodes).toMatchSnapshot();
});
