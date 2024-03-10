import { Dialog } from '@headlessui/react';
import { Form, useResolvedPath, useSearchParams } from '@remix-run/react';
import { IconX } from '@tabler/icons-react';
import { FC } from 'react';

import { BUTTON_ACTION } from '~/constants';

export interface DeleteNodeProps {
  onClose: () => void;
  open: boolean;
}

const DeleteNode: FC<DeleteNodeProps> = (props) => {
  const { onClose, open } = props;

  // Hooks
  const { pathname } = useResolvedPath('.');
  const [params] = useSearchParams();

  // Setup
  const filename = params.get('path') ?? '';

  return (
    <Dialog className="u-modal u-modal-open" onClose={onClose} open={open}>
      <Dialog.Overlay className="u-fixed u-bg-black u-inset-0 u-opacity-15 u-modal-backdrop" />
      <Dialog.Panel className="u-modal-box">
        <Dialog.Title className="u-font-bold u-text-lg u-flex u-items-center">
          <span className="u-flex-1 u-uppercase u-text-primary">
            Are you sure?
          </span>
          <button aria-label="close" type="button" onClick={onClose}>
            <IconX height={28} width={28} />
          </button>
        </Dialog.Title>

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
      </Dialog.Panel>
    </Dialog>
  );
};

export { DeleteNode };
