import { createRemixStub } from '@remix-run/testing';
import { fireEvent, render, screen } from '@testing-library/react';
import { createEditor } from 'slate';
import { Slate, withReact } from 'slate-react';

import { Action } from '~/types/editor';
import { TEST_EDITOR } from '~/utils/test';

import { ToggleStyle, ToggleStyleProps } from '../ToggleStyle';

test('ToggleStyle', () => {
  const onToggle = vi.fn();
  const editor = withReact(createEditor());

  const props: ToggleStyleProps = {
    action: Action.Bold,
    onToggle
  };

  const createComponent = () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => (
          <Slate editor={editor} initialValue={TEST_EDITOR}>
            <ToggleStyle {...props} />{' '}
          </Slate>
        )
      }
    ]);

    return <RemixStub />;
  };

  // Bold
  const { container, rerender } = render(createComponent());
  let icon = screen.getByRole('img');
  expect(icon).toHaveClass('tabler-icon-bold');
  expect(container.childNodes).toMatchSnapshot('bold');

  // Italic
  props.action = Action.Italic;
  rerender(createComponent());
  icon = screen.getByRole('img');
  expect(icon).toHaveClass('tabler-icon-italic');
  expect(container.childNodes).toMatchSnapshot('italic');

  // Underline
  props.action = Action.Underline;
  rerender(createComponent());
  icon = screen.getByRole('img');
  expect(icon).toHaveClass('tabler-icon-underline');
  expect(container.childNodes).toMatchSnapshot('underline');

  // Strikethrough
  props.action = Action.Strikethrough;
  rerender(createComponent());
  icon = screen.getByRole('img');
  expect(icon).toHaveClass('tabler-icon-strikethrough');
  expect(container.childNodes).toMatchSnapshot('strikethrough');

  // Handles click
  fireEvent.mouseDown(screen.getByRole('button'));
  expect(onToggle).toHaveBeenCalledOnce();
  expect(onToggle).toHaveBeenCalledWith(true);
});
