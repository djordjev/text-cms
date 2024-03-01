import { createRemixStub } from '@remix-run/testing';
import { fireEvent, render, screen } from '@testing-library/react';
import { createEditor } from 'slate';
import { Slate, withReact } from 'slate-react';

import { TEST_EDITOR } from '~/utils/test';

import { TextStyle, TextStyleProps } from '../TextStyle';

test('TextStyle', () => {
  const onChange = vi.fn();
  const editor = withReact(createEditor());

  const props: TextStyleProps = { onChange };

  const createComponent = () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => (
          <Slate editor={editor} initialValue={TEST_EDITOR}>
            <TextStyle {...props} />
          </Slate>
        )
      }
    ]);

    return <RemixStub />;
  };

  const { container } = render(createComponent());

  const options = [
    'Heading 1',
    'Heading 2',
    'Heading 3',
    'Heading 4',
    'Heading 5',
    'Heading 6',
    'Paragraph'
  ];

  options.forEach((opt) => expect(screen.getByText(opt)).toBeInTheDocument());

  expect(container.childNodes).toMatchSnapshot();

  const select = container.firstChild!;

  // Select paragraph
  fireEvent.change(select, { currentTarget: { value: 'paragraph' } });

  expect(onChange).toHaveBeenCalledOnce();
  expect(onChange).toHaveBeenCalledWith({ type: 'paragraph' });
});
