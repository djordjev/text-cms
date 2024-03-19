import { FC, FormEvent } from 'react';
import { Editor as SlateEditor, Transforms } from 'slate';
import { useSlate } from 'slate-react';

import { BaseDialog, BaseDialogProps } from '~/components/modals/BaseDialog';

export interface NewTemplateProps extends Partial<BaseDialogProps> {
  onComplete: (payload?: any) => void;
}

const NewTemplate: FC<NewTemplateProps> = (props) => {
  const { className, open, onComplete } = props;

  // Hooks
  const editor = useSlate();

  // Setup
  const { selection } = editor;
  const selectionText = selection
    ? SlateEditor.string(editor, editor.selection!)
    : null;

  // Styles
  const classesInput = `u-input u-input-bordered u-flex u-items-center u-gap-2 u-mb-2xs u-ml-0`;

  // Handlers
  const onClose = () => {
    onComplete();
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const elem = e.currentTarget.elements.namedItem('variable');

    const value = (elem && 'value' in elem && elem.value) ?? '';

    if (!value || !selectionText) return null;

    // editor.insertText(`{{ or .${value} "${selectionText}" }}`);

    const templateElem = {
      type: 'template' as const,
      default: selectionText,
      children: [{ text: `{{ or .${value} "${selectionText}" }}` }]
    };

    Transforms.wrapNodes(editor, templateElem, { split: true });
    onComplete({ default: selectionText });
  };

  return (
    <BaseDialog
      className={className}
      open={!!open}
      onClose={onClose}
      title="Assign template variable"
    >
      <form className="u-py-2x" onSubmit={onSubmit}>
        <label className={classesInput}>
          Template Variable Name
          <input type="text" className="u-grow u-ml-2xs" name="variable" />
        </label>

        <div className="u-divider" />

        <div className="u-flex u-gap-2x">
          <button
            className="u-btn u-btn-outline u-uppercase u-flex-1"
            onClick={onClose}
            type="button"
          >
            Close
          </button>

          <button
            className="u-btn u-btn-primary u-uppercase u-flex-1"
            type="submit"
          >
            Add template
          </button>
        </div>
      </form>
    </BaseDialog>
  );
};

export { NewTemplate };
