import { Form, useActionData, useLoaderData } from '@remix-run/react';
import classnames from 'classnames';
import { useCallback, useState } from 'react';
import { createEditor, Descendant, Editor as SlateEditor } from 'slate';
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
import { BUTTON_ACTION } from '~/utils/constants';

import { action, ACTION_UPSERT } from './action';
import { INITIAL_VALUE } from './constants';
import { Element } from './Element';
import { Leaf } from './Leaf';
import { loader } from './loader';

const Editor = () => {
  // Data
  const actionResponse = useActionData<typeof action>();
  const loaderResponse = useLoaderData<typeof loader>();

  // Setup for hooks
  console.log(loaderResponse);

  // Hooks
  const [editor] = useState(() => withReact(createEditor()));
  const [conditions, setConditions] = useState<ConditionGroup>();
  const [content, setContent] = useState(JSON.stringify(INITIAL_VALUE));

  // Setup
  const strConditions = conditions ? JSON.stringify(conditions) : '';
  const nameError = actionResponse?.errors?.['name'] ?? '';

  // Styles
  const classesBorder = `u-border u-border-solid u-border-secondary u-rounded`;
  const classesContent = classnames(
    classesBorder,
    'u-mx-auto u-bg-white u-mb-3xs'
  );

  const classesName = classnames(
    'u-input u-input-bordered u-input-primary u-w-full',
    { 'u-input-error': nameError }
  );

  // Handlers
  const onClick = (action: Action, value?: AnyAction) => {
    if (value) {
      SlateEditor.addMark(editor, action, value);
    } else {
      SlateEditor.removeMark(editor, action);
    }
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

  const onSlateChange = useCallback((value: Descendant[]) => {
    const isAstChange = editor.operations.some(
      (op) => 'set_selection' !== op.type
    );

    if (!isAstChange) return;

    setContent(JSON.stringify(value));
  }, []);

  return (
    <Form className="u-w-full u-pt-4x" method="POST">
      <input
        className={classesName}
        defaultValue={loaderResponse?.name ?? ''}
        name="name"
        placeholder="Variation Name"
        type="text"
      />
      <em className="u-text-error">{nameError}</em>

      <ConditionEditor
        className="u-mb-3x"
        conditions={conditions}
        onChange={onChangeCondition}
      />

      <input type="hidden" name="condition" value={strConditions} />

      <div className={classesContent}>
        <Slate
          editor={editor}
          initialValue={INITIAL_VALUE}
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
      </div>

      <input type="hidden" name="text" value={content} />

      <button
        className="u-btn u-btn-primary u-mx-auto u-block u-min-w-2z u-uppercase"
        name={BUTTON_ACTION}
        type="submit"
        value={ACTION_UPSERT}
      >
        Save
      </button>
    </Form>
  );
};

export { action, loader };

export default Editor;
