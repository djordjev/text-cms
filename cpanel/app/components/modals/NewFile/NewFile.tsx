import type { CreateParam } from '~/types';

import { Dialog } from '@headlessui/react';
import { Form, useResolvedPath } from '@remix-run/react';
import React from 'react';

export interface NewFileProps {
  open: boolean;
  type: CreateParam;
  onClose: () => void;
}

const NewFile: React.FC<NewFileProps> = (props) => {
  const { onClose, open, type } = props;

  // Hooks
  const inputRef = React.useRef(null);
  const { pathname } = useResolvedPath('.');

  return (
    <Dialog
      className="u-fixed u-z-10 u-inset-0 u-overflow-y-auto"
      initialFocus={inputRef}
      onClose={onClose}
      open={open}
    >
      <div className="u-flex u-items-center u-justify-center u-h-3/4">
        <Dialog.Overlay className="u-fixed u-bg-black u-inset-0 u-opacity-15" />
        <Dialog.Panel className="u-relative u-bg-white u-rounded u-max-w-sm u-mx-auto u-p-2x u-min-w-3z">
          <Dialog.Title className="u-text-primary-300 u-text-lg u-uppercase u-font-bold u-mb-2x u-flex u-items-center">
            <span className="u-flex-1">Create new {type}</span>
            <button type="button" onClick={onClose}>
              <img
                alt="close"
                height={28}
                width={28}
                src="/svg/close.svg"
                loading="lazy"
              />
            </button>
          </Dialog.Title>

          <Form action={pathname} className="u-flex u-flex-col" method="POST">
            <label className="u-mb-1x" htmlFor="name">
              Enter {type} name
            </label>
            <input
              className="u-min-h-5x u-border u-border-solid u-border-gray-2 u-rounded u-mb-4x u-px-2xs"
              id="name"
              name="name"
              ref={inputRef}
              type="text"
            />

            <input type="hidden" name="type" value={type} />

            <button className="btn-primary" type="submit">
              Create
            </button>
          </Form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export { NewFile };
