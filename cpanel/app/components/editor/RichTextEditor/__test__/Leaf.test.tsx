import { createRemixStub } from '@remix-run/testing';
import { render, screen } from '@testing-library/react';

import { Leaf, LeafProps } from '../Leaf';

describe('Leaf', () => {
  let props: LeafProps;

  const createComponent = () => {
    const RemixStub = createRemixStub([
      { path: '/', Component: () => <Leaf {...props} /> }
    ]);

    return <RemixStub />;
  };

  beforeEach(() => {
    props = {
      attributes: { 'data-slate-leaf': true },
      children: <div data-testid="children" />,
      leaf: { text: 'Leaf' }
    } as any;
  });

  describe('regular fields', () => {
    const table = [
      { expected: ['u-font-bold'], name: 'bold', leaf: { bold: true } },
      { expected: ['u-italic'], name: 'italic', leaf: { italic: true } },
      { expected: ['u-line-through'], name: 'strikethrough', leaf: { strikethrough: true } }, // prettier-ignore
      {
        expected: ['u-underline'],
        name: 'underline',
        leaf: { underline: true }
      },
      {
        expected: ['u-font-bold', 'u-italic', 'u-line-through', 'u-underline'],
        name: 'all props',
        leaf: {
          bold: true,
          italic: true,
          strikethrough: true,
          underline: true
        }
      }
    ];

    test.each(table)('tests $name prop', ({ expected, leaf }) => {
      props.leaf = { ...props.leaf, ...leaf };

      const { container } = render(createComponent());

      expected.forEach((c) => expect(container.firstChild!).toHaveClass(c));
      expect(screen.getByTestId('children')).toBeInTheDocument();

      expect(container.childNodes).toMatchSnapshot();
    });
  });

  describe('actions', () => {
    it('renders link', () => {
      props.leaf = {
        ...props.leaf,
        click: {
          action: 'google',
          href: 'www.google.com',
          type: 'link'
        } as any
      };

      const { container } = render(createComponent());

      const tooltip = container.firstChild!.childNodes.item(0);

      expect(tooltip).toHaveClass('u-tooltip');

      const copy = `Displays link with action attribute: google and link to www.google.com`;
      expect(tooltip).toHaveAttribute('data-tip', copy);

      expect(screen.getByTestId('children')).toBeInTheDocument();

      expect(container.childNodes).toMatchSnapshot();
    });
  });
});
