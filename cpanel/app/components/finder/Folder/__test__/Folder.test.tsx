import { createRemixStub } from '@remix-run/testing';
import { render, screen } from '@testing-library/react';

import { Folder, FolderProps } from '../Folder';

test('ContextMenu', () => {
  const props: FolderProps = { name: 'random name' };

  const createComponent = () => {
    const RemixStub = createRemixStub([
      { path: '/', Component: () => <Folder {...props} /> }
    ]);

    return <RemixStub />;
  };

  const { container } = render(createComponent());

  expect(screen.getByText(props.name)).toBeInTheDocument();

  expect(container.childNodes).toMatchSnapshot();
});
