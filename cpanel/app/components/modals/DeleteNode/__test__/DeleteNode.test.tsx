import { createRemixStub } from '@remix-run/testing';
import { fireEvent, render, screen } from '@testing-library/react';

import { DeleteNode, DeleteNodeProps } from '../DeleteNode';

test('DeleteNode', () => {
  const onClose = vi.fn();

  const props: DeleteNodeProps = { onClose, open: true };

  const createComponent = () => {
    const RemixStub = createRemixStub([
      { path: '/', Component: () => <DeleteNode {...props} /> }
    ]);

    return <RemixStub initialEntries={['/?path=filename.txt']} />;
  };

  const { baseElement } = render(createComponent());

  // Renders title
  expect(screen.getByText('Are you sure?')).toBeInTheDocument();

  // Renders body
  expect(screen.getByText(/you want to delete/)).toBeInTheDocument();
  expect(screen.getByText('filename.txt')).toBeInTheDocument();

  // Renders buttons
  expect(screen.getByRole('button', { name: 'No' })).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: 'Yes, delete' })
  ).toBeInTheDocument();

  // Handles close click
  fireEvent.click(screen.getByRole('button', { name: 'close' }));
  expect(onClose).toHaveBeenCalledOnce();

  expect(baseElement).toMatchSnapshot();
});
