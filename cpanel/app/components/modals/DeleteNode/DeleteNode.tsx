import { Form, useResolvedPath, useSearchParams } from '@remix-run/react';
import { FC } from 'react';

import { Modal, ModalProps } from '~/components/modals/Modal';
import { BUTTON_ACTION } from '~/constants';

export interface DeleteNodeProps extends Omit<ModalProps, 'children'> {}

const DeleteNode: FC<DeleteNodeProps> = (props) => {
  const { onClose, open } = props;

  // Hooks
  const { pathname } = useResolvedPath('.');
  const [params] = useSearchParams();

  // Setup
  const filename = params.get('path') ?? '';

  return (
    <Modal onClose={onClose} open={open} title="Are you sure?">
      <Form
        action={pathname}
        className="u-flex u-flex-col u-modal-action"
        method="POST"
      >
        <input type="hidden" name="node" value={filename} />
        <p>
          Are you sure you want to delete{' '}
          <span className="u-font-bold u-text-primary">{filename}</span>? This
          action is irreversible and will delete all content inside of it!
        </p>

        <div className="u-divider" />

        <div className="u-grid u-grid-cols-2 u-gap-3x">
          <button
            className="u-btn u-btn-secondary u-uppercase"
            onClick={onClose}
            type={'button'}
          >
            No
          </button>

          <button
            className="u-btn u-btn-error u-uppercase"
            name={BUTTON_ACTION}
            type="submit"
            value="delete"
          >
            Yes, delete
          </button>
        </div>
      </Form>
    </Modal>
  );
};

export { DeleteNode };
