import classnames from 'classnames';
import { useCallback, useState } from 'react';
import { createEditor, Editor as SlateEditor } from 'slate';
import {
  Editable,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  withReact
} from 'slate-react';

import { ConditionEditor } from '~/components/editor/ConditionEditor';
import { Toolbar } from '~/components/editor/Toolbar';
import { ConditionGroup } from '~/types/condition';
import type { Action, AnyAction } from '~/types/editor';

import { INITIAL_VALUE } from './constants';
import { Element } from './Element';
import { Leaf } from './Leaf';

const Editor = () => {
  // Hooks
  const [editor] = useState(() => withReact(createEditor()));
  const [conditions, setConditions] = useState<ConditionGroup>();

  // Styles
  const classesBorder = `u-border u-border-solid u-border-secondary u-rounded`;
  const classesContent = classnames(
    classesBorder,
    'u-mx-auto u-bg-white u-mb-3xs'
  );

  // Handlers
  const onClick = (action: Action, value?: AnyAction) => {
    if (value) {
      SlateEditor.addMark(editor, action, value);
    } else {
      SlateEditor.removeMark(editor, action);
    }
  };

  const onSave = () => {
    console.log(JSON.parse(JSON.stringify(editor.children)));
    console.log(editor);
  };

  const onChangeCondition = (newConditions: ConditionGroup) => {
    setConditions(newConditions);
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
    <div className="u-w-full u-pt-4x">
      <ConditionEditor
        className="u-mb-3x"
        conditions={conditions}
        onChange={onChangeCondition}
      />

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

      <button
        className="u-btn u-btn-primary u-mx-auto u-block u-min-w-2z u-uppercase"
        onClick={onSave}
        type="button"
      >
        Save
      </button>
    </div>
  );
};

export default Editor;
