import { IconLink } from '@tabler/icons-react';
import classnames from 'classnames';
import { FC, useState } from 'react';
import { Editor } from 'slate';
import { useSlate } from 'slate-react';

import { TextAction } from '~/components/modals/TextAction';
import { Action, ClickActionPayload } from '~/types/editor';

export interface TextActionsProps {
  className?: string;
  onClick: (payload?: ClickActionPayload) => void;
}

const TextActions: FC<TextActionsProps> = (props) => {
  const { className, onClick } = props;

  // Hooks
  const editor = useSlate();
  const [open, setOpen] = useState(false);

  // Setup
  const marks = Editor.marks(editor);
  const active = !!marks?.[Action.Click];

  // Styles
  const classes = classnames('u-p-1xs', className, {
    'u-bg-accent u-rounded-md': active
  });

  // Handlers
  const onToggle = () => {
    if (active) {
      onClick();
      return;
    }

    setOpen(true);
  };

  const onComplete = (payload?: ClickActionPayload) => {
    setOpen(false);

    if (!payload) return;

    onClick(payload);
  };

  // Markdown

  // Life-cycle

  // Short-circuit

  return (
    <>
      <button className={classes} onClick={onToggle} type="button">
        <IconLink />
      </button>

      <TextAction open={open} onComplete={onComplete} />
    </>
  );
};

export { TextActions };
