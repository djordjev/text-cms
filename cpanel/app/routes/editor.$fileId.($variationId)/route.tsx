import classnames from 'classnames';
import React, { useCallback } from 'react';
import { createEditor, Editor as SlateEditor } from 'slate';
import {
  Editable,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  withReact
} from 'slate-react';

import { Toolbar } from '~/components/editor/Toolbar';
import type { Action, AnyAction } from '~/types/editor';

import { INITIAL_VALUE } from './constants';
import { Element } from './Element';
import { Leaf } from './Leaf';

const Editor = () => {
  // Hooks
  const [editor] = React.useState(() => withReact(createEditor()));

  // Styles
  const classesBorder = `u-border u-border-solid u-border-secondary u-rounded`;
  const classesContent = classnames(
    classesBorder,
    'u-container u-mx-auto u-bg-white'
  );

  // Handlers
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
    <div className="u-w-full">
      <div className={classesContent}>
        <Slate editor={editor} initialValue={INITIAL_VALUE}>
          <Toolbar onClick={onClick} />

          <Editable
            className="u-outline-0 u-p-2xs"
            spellCheck={true}
            renderElement={renderElement}
            renderLeaf={renderLeaf}
          />
        </Slate>
      </div>
    </div>
  );
};

export default Editor;
