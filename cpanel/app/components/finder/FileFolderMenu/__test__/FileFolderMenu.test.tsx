import { createRemixStub } from '@remix-run/testing';
import { render, screen } from '@testing-library/react';

import { FileFolderMenu, FileFolderMenuProps } from '../FileFolderMenu';

test('ContextMenu', () => {
  const props: FileFolderMenuProps = { path: '/finder/something.txt' };

  const createComponent = () => {
    const RemixStub = createRemixStub([
      { path: '/', Component: () => <FileFolderMenu {...props} /> }
    ]);

    return <RemixStub />;
  };

  const { container } = render(createComponent());

  expect(screen.getByText('Delete')).toBeInTheDocument();

  expect(container.childNodes).toMatchSnapshot();
});
