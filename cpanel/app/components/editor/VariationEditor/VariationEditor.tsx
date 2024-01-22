import classnames from 'classnames';
import React from 'react';
import { createEditor, Editor } from 'slate';
import {
  Editable,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  withReact
} from 'slate-react';

import { INITIAL_VALUE } from './constants';
import { Element } from './Element';
import { Leaf } from './Leaf';
import { Toolbar } from './Toolbar';
import type { Action } from './types';

export interface VariationEditorProps {
  className?: string;
  name: string;
}

const VariationEditor: React.FC<VariationEditorProps> = (props) => {
  const { className, name } = props;

  // Hooks
  const [editor] = React.useState(() => withReact(createEditor()));

  // Styles
  const classes = classnames('u-my-10x', className);
  const classesBorder = `u-border u-border-solid u-border-primary-500 u-rounded`;
  const classesContent = classnames(
    classesBorder,
    'container-sm u-mx-auto u-bg-white'
  );

  // Handlers
  const onClick = (action: Action, value?: string | boolean) => {
    if (value) {
      Editor.addMark(editor, action, value);
    } else {
      Editor.removeMark(editor, action);
    }
  };

  const onSave = () => {
    console.log('save', editor.children);
  };

  // Markup
  const renderLeaf = React.useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    []
  );

  const renderElement = React.useCallback(
    (props: RenderElementProps) => <Element {...props} />,
    []
  );

  return (
    <div className={classes}>
      {name}

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

      <div>
        <button className="btn-primary" onClick={onSave} type="button">
          Save
        </button>
      </div>
    </div>
  );
};

export { VariationEditor };
