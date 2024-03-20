import { FC, FormEvent } from 'react';
import { useSlate } from 'slate-react';

import { Modal, ModalProps } from '~/components/modals/Modal';

export interface NewTemplateProps extends Omit<ModalProps, 'children'> {}

const NewTemplate: FC<NewTemplateProps> = (props) => {
  const { className, open, onClose } = props;

  // Hooks
  const editor = useSlate();

  // Styles
  const classesInput = `u-input u-input-bordered u-flex u-items-center u-gap-2 u-mb-2xs u-ml-0`;

  // Handlers
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const variable = e.currentTarget.elements.namedItem('variable');
    const defaultVal = e.currentTarget.elements.namedItem('defaultValue');

    const value = variable && 'value' in variable ? variable.value : '';
    const defVal = defaultVal && 'value' in defaultVal ? defaultVal.value : '';

    if (!value) return null;

    const template = `{{ or .${value} "${defVal}" }}`;

    editor.insertText(template);

    onClose();
  };

  return (
    <Modal
      className={className}
      open={open}
      onClose={onClose}
      title="Assign template variable"
    >
      <form className="u-py-2x" onSubmit={onSubmit}>
        <label className={classesInput}>
          Template Variable Name
          <input type="text" className="u-grow u-ml-2xs" name="variable" />
        </label>

        <label className={classesInput}>
          Default Value
          <input type="text" className="u-grow u-ml-2xs" name="defaultValue" />
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
    </Modal>
  );
};

export { NewTemplate };
