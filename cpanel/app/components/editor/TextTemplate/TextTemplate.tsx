import { IconPlaceholder } from '@tabler/icons-react';
import classnames from 'classnames';
import { FC, useState } from 'react';

import { NewTemplate } from '~/components/modals/NewTemplate/NewTemplate';

export interface TextTemplateProps {
  className?: string;
}

const TextTemplate: FC<TextTemplateProps> = (props) => {
  const { className } = props;

  // Hooks
  const [open, setOpen] = useState(false);

  // Styles
  const classes = classnames('u-p-1xs', className);

  // Handlers
  const onOpen = () => setOpen(true);

  const onClose = () => setOpen(false);

  return (
    <>
      <button className={classes} onClick={onOpen} type="button">
        <IconPlaceholder />
      </button>

      <NewTemplate open={open} onClose={onClose} />
    </>
  );
};

export { TextTemplate };
