import { Form, useActionData, useLoaderData } from '@remix-run/react';
import classnames from 'classnames';

import { ConditionEditor } from '~/components/editor/ConditionEditor';
import { RichTextEditor } from '~/components/editor/RichTextEditor';
import { BUTTON_ACTION } from '~/constants';

import { action, ACTION_UPSERT } from './action';
import { ErrorBoundary } from './ErrorBoundary';
import { loader } from './loader';

const Editor = () => {
  // Data
  const actionResponse = useActionData<typeof action>();
  const loaderResponse = useLoaderData<typeof loader>();

  // Setup
  const nameError = actionResponse?.errors?.['name'] ?? '';
  const text = loaderResponse.text;

  // Styles
  const classesName = classnames(
    'u-input u-input-bordered u-input-primary u-w-full',
    { 'u-input-error': nameError }
  );

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
        defaultCondition={loaderResponse.condition ?? undefined}
      />

      <RichTextEditor defaultValue={text} />

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

export { action, ErrorBoundary, loader };

export default Editor;
