import { IconPlaceholder } from '@tabler/icons-react';
import classnames from 'classnames';
import { FC, useState } from 'react';
import { Editor, Point } from 'slate';
import { useSlate } from 'slate-react';

import { NewTemplate } from '~/components/modals/NewTemplate/NewTemplate';
import { Action } from '~/types/editor';

export interface TextTemplateProps {
  className?: string;
}

const TextTemplate: FC<TextTemplateProps> = (props) => {
  const { className } = props;

  // Hooks
  const editor = useSlate();
  const [open, setOpen] = useState(false);

  // Setup
  const marks = Editor.marks(editor);
  const active = !!marks?.[Action.Template];

  const { selection } = editor;

  const focus = selection?.focus;
  const anchor = selection?.anchor;

  const isSelected = focus && anchor && Point.compare(anchor, focus) !== 0;

  // Styles
  const classes = classnames('u-p-1xs', className, {
    'u-bg-accent u-rounded-md': active,
    'u-disabled': !editor.selection,
    'u-opacity-50': !isSelected
  });

  // Handlers
  const onToggle = () => {
    if (active) {
      return;
    }

    setOpen(true);
  };

  const onComplete = () => {
    setOpen(false);
  };

  return (
    <>
      <button
        className={classes}
        disabled={!isSelected}
        onClick={onToggle}
        type="button"
      >
        <IconPlaceholder />
      </button>

      <NewTemplate open={open} onComplete={onComplete} />
    </>
  );
};

export { TextTemplate };
