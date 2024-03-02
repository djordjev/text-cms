import { createRemixStub } from '@remix-run/testing';
import { render } from '@testing-library/react';

import { Element, ElementProps } from '../Element';

test('Element', () => {
  const attributes: any = {};
  const children: unknown = [];

  const props: ElementProps = {
    attributes,
    children,
    element: {
      type: 'paragraph',
      children: [{ text: 'children-text' }]
    }
  };

  const createComponent = () => {
    const RemixStub = createRemixStub([
      { path: '/', Component: () => <Element {...props} /> }
    ]);

    return <RemixStub />;
  };

  // Paragraph
  const { container, rerender } = render(createComponent());
  expect(container.childNodes).toMatchSnapshot('paragraph');

  // Heading
  props.element = { align: 'right', children: [], level: 2, type: 'heading' };
  rerender(createComponent());
  expect(container.childNodes).toMatchSnapshot('heading');
});
