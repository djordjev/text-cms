import { createRemixStub } from '@remix-run/testing';
import { render, screen } from '@testing-library/react';

import { TEST_EDITOR } from '~/utils/test';

import { Text, TextProps } from '../Text';

test('Text', () => {
  const props: TextProps = {
    text: JSON.stringify(TEST_EDITOR)
  };

  const createComponent = () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => <Text {...props} />
      }
    ]);

    return <RemixStub />;
  };

  const { container } = render(createComponent());

  // Displays heading
  expect(screen.getByText('HEADING')).toBeInTheDocument();

  const matcher = (content: string, element: Element | null) => {
    return element?.textContent === 'A line of text in a paragraph.';
  };

  // Displays paragraph
  expect(screen.getByText(matcher)).toBeInTheDocument();

  // Sets up styling
  expect(screen.getByText(/line/)).toHaveClass('u-italic');
  expect(screen.getByText(/paragraph/)).toHaveClass('u-font-bold');
  expect(screen.getByText(/text/)).toHaveClass('u-font-bold');
  expect(screen.getByText(/text/)).toHaveAttribute('style');

  expect(container.childNodes).toMatchSnapshot();
});
