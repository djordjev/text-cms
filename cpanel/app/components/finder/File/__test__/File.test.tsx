import { createRemixStub } from '@remix-run/testing';
import { render, screen } from '@testing-library/react';

import { File, FileProps } from '../File';

test('ContextMenu', () => {
  const props: FileProps = { name: 'file name' };

  const createComponent = () => {
    const RemixStub = createRemixStub([
      { path: '/', Component: () => <File {...props} /> }
    ]);

    return <RemixStub />;
  };

  const { container } = render(createComponent());

  expect(screen.getByText(props.name)).toBeInTheDocument();

  expect(container.childNodes).toMatchSnapshot();
});
