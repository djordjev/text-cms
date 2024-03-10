import classnames from 'classnames';
import { FC, useCallback, useState } from 'react';
import { createEditor, Descendant, Editor as SlateEditor } from 'slate';
import {
  Editable,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  withReact
} from 'slate-react';

import { Toolbar } from '~/components/editor/Toolbar';
import type { Action, AnyAction } from '~/types/editor';
import { CustomElement } from '~/types/editor';

import { Element } from './Element';
import { Leaf } from './Leaf';

export interface RichTextEditorProps {
  className?: string;
  defaultValue: CustomElement[];
}

const RichTextEditor: FC<RichTextEditorProps> = (props) => {
  const { className, defaultValue } = props;

  // Hooks
  const [editor] = useState(() => withReact(createEditor()));
  const [content, setContent] = useState(() => JSON.stringify(defaultValue));

  // Styles
  const classesBorder = 'u-border u-border-solid u-border-secondary u-rounded';
  const classes = classnames(
    classesBorder,
    'u-mx-auto u-bg-white u-mb-3xs',
    className
  );

  // Handlers
  const onSlateChange = useCallback(
    (value: Descendant[]) => {
      const isAstChange = editor.operations.some(
        (op) => 'set_selection' !== op.type
      );

      if (!isAstChange) return;

      setContent(JSON.stringify(value));
    },
    [editor.operations]
  );

  const onClick = (action: Action, value?: AnyAction) => {
    if (value) {
      SlateEditor.addMark(editor, action, value);
    } else {
      SlateEditor.removeMark(editor, action);
    }
  };

  // Markup
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    []
  );

  const renderElement = useCallback(
    (props: RenderElementProps) => <Element {...props} />,
    []
  );

  return (
    <div className={classes}>
      <Slate
        editor={editor}
        initialValue={defaultValue}
        onChange={onSlateChange}
      >
        <Toolbar onClick={onClick} />

        <Editable
          className="u-outline-0 u-p-2xs"
          spellCheck={true}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
        />
      </Slate>

      <input type="hidden" name="text" value={content} />
    </div>
  );
};

export { RichTextEditor };
