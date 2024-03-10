import { createRemixStub } from '@remix-run/testing';
import { render, screen } from '@testing-library/react';

import { CustomElement } from '~/types/editor';
import { TEST_EDITOR } from '~/utils/test';

import { RichTextEditor, RichTextEditorProps } from '../RichTextEditor';

test('RichTextEditor', () => {
  const initialText = TEST_EDITOR as CustomElement[];
  const props: RichTextEditorProps = { defaultValue: initialText };

  const createComponent = () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: () => <RichTextEditor {...props} />
      }
    ]);

    return <RemixStub />;
  };

  const { container } = render(createComponent());

  const heading = initialText[0].children[0].text;

  expect(screen.getByText(heading)).toBeInTheDocument();

  const content = screen.getByTestId('editor-content') as HTMLInputElement;
  expect(content.value).toBe(JSON.stringify(initialText));

  expect(container.childNodes).toMatchSnapshot();
});
