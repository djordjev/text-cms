import { createRemixStub } from '@remix-run/testing';
import { fireEvent, render, screen } from '@testing-library/react';

import { newNode } from '~/api/__fixtures__/node';

import Finder from '../route';

test('finder.$ route', async () => {
  const createComponent = () => {
    const RemixStub = createRemixStub([
      {
        path: '/finder',
        Component: () => <Finder />,
        loader: () => {
          return [
            newNode({ id: 20, name: 'Folder1', typeId: 1 }),
            newNode({ id: 21, name: 'File1.txt', typeId: 2 })
          ];
        }
      }
    ]);

    return <RemixStub initialEntries={['/finder']} />;
  };

  const { container } = render(createComponent());

  // Awaits for breadcrumbs
  expect(await screen.findByText('Home')).toBeInTheDocument();

  // Renders file and folder
  expect(screen.getByRole('img', { name: 'Folder1' })).toBeInTheDocument();
  expect(screen.getByRole('img', { name: 'File1.txt' })).toBeInTheDocument();

  // Matches screenshot
  expect(container.childNodes).toMatchSnapshot();

  // Right click - delete
  fireEvent.contextMenu(screen.getByText('File1.txt'));
  expect(screen.getByText('Delete')).toBeInTheDocument();

  // Right click - background
  fireEvent.contextMenu(screen.getByTestId('background'));
  expect(screen.getByText('New Folder')).toBeInTheDocument();
  expect(screen.getByText('New File')).toBeInTheDocument();
});
