import { createRemixStub } from '@remix-run/testing';
import { render, screen } from '@testing-library/react';

import { FILE_CONTENT } from '~/api/__fixtures__/file';

import {
  DraggableVariation,
  DraggableVariationProps
} from '../DraggableVariation';

test('DraggableVariation', () => {
  const props: DraggableVariationProps = {
    fileId: 12,
    variation: FILE_CONTENT[1] as any
  };

  const createComponent = () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => <DraggableVariation {...props} />
      }
    ]);

    return <RemixStub />;
  };

  const { container } = render(createComponent());

  expect(
    screen.getByRole('heading', { name: 'Second Variation' })
  ).toBeInTheDocument();

  expect(container.childNodes).toMatchSnapshot();
});
