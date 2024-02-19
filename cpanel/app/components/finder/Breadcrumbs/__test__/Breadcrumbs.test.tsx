import { createRemixStub } from '@remix-run/testing';
import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';

import { Breadcrumbs, BreadcrumbsProps } from '../Breadcrumbs';

describe('Breadcrumbs', () => {
  const props: BreadcrumbsProps = {};

  const createComponent = (path = '/finder') => {
    const TestComponent = createRemixStub([
      {
        path,
        Component: () => <Breadcrumbs {...props} />
      }
    ]);

    return <TestComponent initialEntries={[path]} />;
  };

  it('renders home route', () => {
    const { container } = render(createComponent());

    expect(screen.getByText(/You`re in base folder/)).toBeInTheDocument();

    expect(container.childNodes).toMatchSnapshot();
  });

  it('renders particular route', () => {
    const route = '/finder/first/second/some-file.txt';
    const { container } = render(createComponent(route));

    expect(screen.queryByText(/You`re in base folder/)).not.toBeInTheDocument();

    const segments = ['Home', 'first', 'second', 'some-file.txt'];
    segments.forEach((segment) => {
      expect(screen.getByText(segment)).toBeInTheDocument();
    });

    expect(container.childNodes).toMatchSnapshot();
  });
});
