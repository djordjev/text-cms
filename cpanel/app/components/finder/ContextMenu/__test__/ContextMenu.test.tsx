import { createRemixStub } from '@remix-run/testing';
import { render, screen } from '@testing-library/react';

import { ContextMenu, ContextMenuProps } from '../ContextMenu';

test('ContextMenu', () => {
  const props: ContextMenuProps = {};

  const createComponent = () => {
    const RemixStub = createRemixStub([
      { path: '/', Component: () => <ContextMenu {...props} /> }
    ]);

    return <RemixStub />;
  };

  const { container } = render(createComponent());

  expect(screen.getByText('New File')).toBeInTheDocument();
  expect(screen.getByText('New Folder')).toBeInTheDocument();

  expect(container.childNodes).toMatchSnapshot();
});
