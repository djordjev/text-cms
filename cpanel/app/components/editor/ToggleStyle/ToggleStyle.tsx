import {
  IconBold,
  IconItalic,
  IconStrikethrough,
  IconUnderline,
  TablerIconsProps
} from '@tabler/icons-react';
import classnames from 'classnames';
import { FC, MouseEvent } from 'react';
import { Editor } from 'slate';
import { useSlate } from 'slate-react';

import { Action } from '~/types/editor';

export interface ToggleStyleProps {
  action: Action;
  className?: string;
  onToggle: (isSelected: boolean) => void;
}

const ToggleStyle: FC<ToggleStyleProps> = (props) => {
  const { action, className, onToggle } = props;

  // Hooks
  const editor = useSlate();

  // Setup
  const marks = Editor.marks(editor);
  const active = !!marks?.[action];

  const iconProps: TablerIconsProps = { height: 20, width: 20 };

  // Styles
  const classes = classnames('u-p-1xs', className, {
    'u-bg-accent u-rounded-md': active
  });

  // Handlers
  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onToggle(!active);
  };

  // Markup
  const renderIcon = () => {
    if (action === Action.Bold) return <IconBold {...iconProps} />;
    if (action === Action.Italic) return <IconItalic {...iconProps} />;
    if (action === Action.Underline) return <IconUnderline {...iconProps} />;
    if (action === Action.Strikethrough) {
      return <IconStrikethrough {...iconProps} />;
    }

    return null;
  };

  return (
    <button className={classes} onMouseDown={onClick} type="button">
      {renderIcon()}
    </button>
  );
};

export { ToggleStyle };
