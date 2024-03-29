import { createRemixStub } from '@remix-run/testing';
import { render, screen } from '@testing-library/react';

import { FILE_CONTENT } from '~/api/__fixtures__/file';

import { VariationsDND, VariationsDNDProps } from '../VariationsDND';

test('VariationsDND', () => {
  const props: VariationsDNDProps = {
    id: 1,
    onDragEnd: vi.fn(),
    variations: FILE_CONTENT as any
  };

  const createComponent = () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => <VariationsDND {...props} />
      }
    ]);

    return <RemixStub />;
  };

  const { container } = render(createComponent());

  expect(screen.getByText('First Variation')).toBeInTheDocument();

  expect(container.childNodes).toMatchSnapshot();
});
