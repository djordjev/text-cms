import { createRemixStub } from '@remix-run/testing';
import { fireEvent, render, screen } from '@testing-library/react';
import { createEditor } from 'slate';
import { Slate, withReact } from 'slate-react';

import { TEST_EDITOR } from '~/utils/test';

import { TextAlignment, TextAlignmentProps } from '../TextAlignment';

test('TextAlignment', () => {
  const onChange = vi.fn();
  const editor = withReact(createEditor());

  const props: TextAlignmentProps = { onChange };

  const createComponent = () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => (
          <Slate editor={editor} initialValue={TEST_EDITOR}>
            <TextAlignment {...props} />{' '}
          </Slate>
        )
      }
    ]);

    return <RemixStub />;
  };

  const { container } = render(createComponent());

  expect(container.childNodes).toMatchSnapshot();

  fireEvent.click(screen.getByRole('button', { name: 'Right' }));

  expect(onChange).toHaveBeenCalledOnce();
  expect(onChange).toHaveBeenCalledWith({ align: 'right' });
});
