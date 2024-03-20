import { FC, FormEvent } from 'react';

import { Modal } from '~/components/modals/Modal';
import { BUTTON_ACTION } from '~/constants';
import { ClickActionPayload } from '~/types/editor';

export interface TextActionProps {
  className?: string;
  onComplete: (payload?: ClickActionPayload) => void;
  open: boolean;
}

const TextAction: FC<TextActionProps> = (props) => {
  const { className, open, onComplete } = props;

  // Styles
  const classesInput = `u-input u-input-bordered u-flex u-items-center u-gap-2 u-mb-2xs u-ml-0`;

  // Handlers
  const onClose = () => {
    onComplete();
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const elements = e.currentTarget.elements;

    const elemType = elements.namedItem('action_type') as HTMLSelectElement;
    const elemAction = elements.namedItem('click_action') as HTMLInputElement;
    const elemLink = elements.namedItem('click_link') as HTMLInputElement;

    const typeVal = elemType.value as 'link' | 'primary' | 'secondary' | 'none';
    const actionVal = elemAction.value;
    const linkVal = elemLink.value;

    if (typeVal === 'none') return;
    if (!actionVal && !linkVal) return;

    onComplete({ action: actionVal, href: linkVal, type: typeVal });
  };

  return (
    <Modal
      className={className}
      onClose={onClose}
      open={open}
      title="Attach action to text node"
    >
      <form className="u-flex u-flex-col u-pt-3x" onSubmit={onSubmit}>
        <select
          aria-label="type selection"
          className="u-select u-select-bordered u-w-full u-mb-2xs"
          name="action_type"
        >
          <option value="none">Select action type</option>
          <option value="link">Link</option>
          <option value="primary">Primary button</option>
          <option value="secondary">Secondary button</option>
        </select>

        <label className={classesInput}>
          Action
          <input
            type="text"
            className="u-grow u-ml-2xs"
            name="click_action"
            placeholder="Any string"
          />
        </label>

        <label className={classesInput}>
          Link
          <input
            type="text"
            className="u-grow u-ml-2xs"
            name="click_link"
            placeholder="www.example.com"
          />
        </label>

        <div className="u-divider" />

        <div className="u-grid u-grid-cols-2 u-gap-3x">
          <button
            className="u-btn u-btn-secondary u-btn-outline u-uppercase"
            onClick={onClose}
            type={'button'}
          >
            Close
          </button>

          <button
            className="u-btn u-btn-primary u-uppercase"
            name={BUTTON_ACTION}
            type="submit"
          >
            Add Action
          </button>
        </div>
      </form>
    </Modal>
  );
};

export { TextAction };
