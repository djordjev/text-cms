const mocks = vi.hoisted(() => ({ TextAction: (props: {open: boolean}) => props.open && <div data-testid="modal" /> })); // prettier-ignore
vi.mock('~/components/modals/TextAction', () => ({ ...mocks }));

import { createRemixStub } from '@remix-run/testing';
import { fireEvent, render, screen } from '@testing-library/react';
import { createEditor } from 'slate';
import { Slate, withReact } from 'slate-react';

import { TEST_EDITOR } from '~/utils/test';

import { TextActions, TextActionsProps } from '../TextActions';

test('TextActions', () => {
  const onClick = vi.fn();

  const props: TextActionsProps = { onClick };

  const editor = withReact(createEditor());

  const createComponent = () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => (
          <Slate editor={editor} initialValue={TEST_EDITOR}>
            <TextActions {...props} />
          </Slate>
        )
      }
    ]);

    return <RemixStub />;
  };

  const { container } = render(createComponent());

  expect(container.childNodes).toMatchSnapshot('initial');

  fireEvent.click(screen.getByRole('button'));

  expect(screen.getByTestId('modal')).toBeInTheDocument();
});
