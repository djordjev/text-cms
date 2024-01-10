import classnames from 'classnames';
import * as React from 'react';
import { Editor, Transforms, createEditor } from 'slate';
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
    'u-container u-mx-auto u-bg-white'
  );

  // Handlers
  const onClick = (action: Action) => {
    console.log(action);

    Editor.addMark(editor, action, true);
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

          <Editable renderElement={renderElement} renderLeaf={renderLeaf} />
        </Slate>
      </div>
    </div>
  );
};

export { VariationEditor };
