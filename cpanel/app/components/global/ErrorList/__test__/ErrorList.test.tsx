import { createRemixStub } from '@remix-run/testing';
import { render, screen } from '@testing-library/react';

import { ErrorList, ErrorListProps } from '../ErrorList';

test('ErrorList', () => {
  const props: ErrorListProps = {
    errors: ['first error', 'second error']
  };

  const createComponent = () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => <ErrorList {...props} />
      }
    ]);

    return <RemixStub />;
  };

  const { container, rerender } = render(createComponent());

  props.errors!.forEach((e) => expect(screen.getByText(e)).toBeInTheDocument());

  expect(container.childNodes).toMatchSnapshot();

  // does not render if no errors
  props.errors = undefined;
  rerender(createComponent());

  expect(container.childNodes).toHaveLength(0);
});
