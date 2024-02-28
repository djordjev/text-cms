import { Dialog } from '@headlessui/react';
import { IconX } from '@tabler/icons-react';
import classnames from 'classnames';
import { FC, FormEvent } from 'react';

import { ClickActionPayload } from '~/types/editor';
import { BUTTON_ACTION } from '~/utils/constants';

export interface TextActionProps {
  className?: string;
  open: boolean;
  onComplete: (payload?: ClickActionPayload) => void;
}

const TextAction: FC<TextActionProps> = (props) => {
  const { className, open, onComplete } = props;

  // Styles
  const classes = classnames('u-modal u-modal-open', className);
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
    <Dialog className={classes} onClose={onClose} open={open}>
      <Dialog.Overlay className="u-fixed u-bg-black u-inset-0 u-opacity-15 u-modal-backdrop" />
      <Dialog.Panel className="u-modal-box">
        <Dialog.Title className="u-font-bold u-text-lg u-flex u-items-center">
          <span className="u-flex-1 u-uppercase u-text-primary">
            Attach action to text node
          </span>
          <button aria-label="close" type="button" onClick={onClose}>
            <IconX height={28} width={28} />
          </button>
        </Dialog.Title>

        <form className="u-flex u-flex-col u-pt-3x" onSubmit={onSubmit}>
          <select
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
              value="delete"
            >
              Add Action
            </button>
          </div>
        </form>
      </Dialog.Panel>
    </Dialog>
  );
};

export { TextAction };
