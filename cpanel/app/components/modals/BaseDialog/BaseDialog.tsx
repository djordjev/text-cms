import { Dialog } from '@headlessui/react';
import { IconX } from '@tabler/icons-react';
import classnames from 'classnames';
import { FC, ReactNode } from 'react';

export interface BaseDialogProps {
  children: ReactNode;
  className?: string;
  onClose?: () => void;
  open: boolean;
  title?: string;
}

const BaseDialog: FC<BaseDialogProps> = (props) => {
  const { children, className, onClose = () => {}, open, title } = props;

  // Styles
  const classes = classnames('u-modal u-modal-open', className);

  return (
    <Dialog className={classes} onClose={onClose} open={open}>
      <Dialog.Overlay className="u-fixed u-bg-black u-inset-0 u-opacity-15 u-modal-backdrop" />
      <Dialog.Panel className="u-modal-box">
        <Dialog.Title className="u-font-bold u-text-lg u-flex u-items-center">
          <span className="u-flex-1 u-uppercase u-text-primary">{title}</span>
          <button aria-label="close" type="button" onClick={onClose}>
            <IconX height={28} width={28} />
          </button>
        </Dialog.Title>

        {children}
      </Dialog.Panel>
    </Dialog>
  );
};

export { BaseDialog };
