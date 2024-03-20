import { Form, useResolvedPath } from '@remix-run/react';
import React, { FormEvent } from 'react';

import { Modal, ModalProps } from '~/components/modals/Modal';
import { BUTTON_ACTION } from '~/constants';
import type { CreateParam } from '~/types';

export interface NewFileProps extends Omit<ModalProps, 'children'> {
  type: CreateParam | null;
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
  const title = `Create new ${actionName}`;

  // Handlers
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const data = new FormData(e.currentTarget);

    if (!data.get('name')) e.preventDefault();
  };

  return (
    <Modal onClose={onClose} title={title} open={open}>
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

        <button
          className="u-btn u-btn-accent u-uppercase"
          name={BUTTON_ACTION}
          type="submit"
          value="create"
        >
          Create
        </button>
      </Form>
    </Modal>
  );
};

export { NewFile };
