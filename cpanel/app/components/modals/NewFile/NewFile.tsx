import { Dialog } from '@headlessui/react';
import { Form, useResolvedPath } from '@remix-run/react';
import { IconX } from '@tabler/icons-react';
import React, { FormEvent } from 'react';

import type { CreateParam } from '~/types';

export interface NewFileProps {
  type: CreateParam | null;
  onClose: () => void;
}

const NewFile: React.FC<NewFileProps> = (props) => {
  const { onClose, type } = props;

  // Hooks
  const inputRef = React.useRef(null);
  const { pathname } = useResolvedPath('.');

  // Setup
  const open = type !== null;
  const isFile = type === 'new-file';
  const actionName = isFile ? 'file' : 'folder';

  // Handlers
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const data = new FormData(e.currentTarget);

    if (!data.get('name')) e.preventDefault();
  };

  return (
    <Dialog
      className="u-modal u-modal-open"
      initialFocus={inputRef}
      onClose={onClose}
      open={open}
    >
      <Dialog.Overlay className="u-fixed u-bg-black u-inset-0 u-opacity-15 u-modal-backdrop" />
      <Dialog.Panel className="u-modal-box">
        <Dialog.Title className="u-font-bold u-text-lg u-flex u-items-center">
          <span className="u-flex-1 u-uppercase u-text-primary">
            Create new {actionName}
          </span>
          <button aria-label="close" type="button" onClick={onClose}>
            <IconX height={28} width={28} />
          </button>
        </Dialog.Title>

        <Form
          action={pathname}
          className="u-flex u-flex-col u-modal-action"
          method="POST"
          onSubmit={onSubmit}
        >
          <label className="u-w-full" htmlFor="name">
            <div className="u-label">Enter new {actionName} name</div>
            <input
              className="u-input u-input-bordered u-input-primary u-w-full"
              id="name"
              name="name"
              ref={inputRef}
              type="text"
            />
          </label>

          <input type="hidden" name="type" value={type ?? ''} />

          <div className="u-divider" />

          <button className="u-btn u-btn-accent u-uppercase" type="submit">
            Create
          </button>
        </Form>
      </Dialog.Panel>
    </Dialog>
  );
};

export { NewFile };
