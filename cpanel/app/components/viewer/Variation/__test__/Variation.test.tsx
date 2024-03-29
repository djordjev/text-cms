import { createRemixStub } from '@remix-run/testing';
import { render, screen } from '@testing-library/react';

import { FILE_CONTENT } from '~/api/__fixtures__/file';

import { Variation, VariationProps } from '../Variation';

test('Variation', () => {
  const props: VariationProps = {
    fileId: 12,
    variation: FILE_CONTENT[1] as any
  };

  const createComponent = () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => <Variation {...props} />
      }
    ]);

    return <RemixStub />;
  };

  const { container, rerender } = render(createComponent());

  expect(
    screen.getByRole('heading', { name: 'Second Variation' })
  ).toBeInTheDocument();

  const editLink = screen.getByRole('link', { name: 'Edit' });
  expect(editLink).toBeInTheDocument();
  expect(editLink).toHaveAttribute('href', '/editor/12/2');

  expect(screen.getByText('b = 1')).toBeInTheDocument();
  expect(screen.getByText('c > 12')).toBeInTheDocument();
  expect(screen.getByText('w = true')).toBeInTheDocument();

  expect(screen.queryAllByText(/AND/)).toHaveLength(3);
  expect(screen.queryAllByText('OR')).toHaveLength(2);

  expect(screen.getByText('HEADING')).toBeInTheDocument();
  expect(screen.getByText('paragraph')).toBeInTheDocument();

  expect(container.childNodes).toMatchSnapshot();

  // renders draggable
  props.draggable = true;
  rerender(createComponent());

  expect(screen.getByLabelText('move')).toBeInTheDocument();
});
