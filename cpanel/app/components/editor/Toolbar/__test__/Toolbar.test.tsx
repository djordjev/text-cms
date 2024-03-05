import { createRemixStub } from '@remix-run/testing';
import { render } from '@testing-library/react';
import { createEditor } from 'slate';
import { Slate, withReact } from 'slate-react';

import { TEST_EDITOR } from '~/utils/test';

import { Toolbar, ToolbarProps } from '../Toolbar';

test('Toolbar', () => {
  const onClick = vi.fn();

  const props: ToolbarProps = { onClick };

  const editor = withReact(createEditor());

  const createComponent = () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => (
          <Slate editor={editor} initialValue={TEST_EDITOR}>
            <Toolbar {...props} />
          </Slate>
        )
      }
    ]);

    return <RemixStub />;
  };

  const { container } = render(createComponent());

  expect(container.childNodes).toMatchSnapshot();
});
