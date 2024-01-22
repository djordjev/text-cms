import { FC, MouseEvent } from 'react';
import { Editor } from 'slate';
import { useSlate } from 'slate-react';

import { Bold } from '~/components/editor/icons/Bold';
import { Italic } from '~/components/editor/icons/Italic';
import { IconProps } from '~/components/editor/icons/Props';
import { Strikethrough } from '~/components/editor/icons/Strikethrough';
import { Underline } from '~/components/editor/icons/Underline';
import { Action } from '~/components/editor/VariationEditor/types';
export interface ToggleStyleProps {
  action: Action;
  onToggle: (isSelected: boolean) => void;
}

const ToggleStyle: FC<ToggleStyleProps> = (props) => {
  const { action, onToggle } = props;

  // Hooks
  const editor = useSlate();

  // Setup
  const marks = Editor.marks(editor);
  const active = !!marks?.[action];

  const iconProps: IconProps = { active, height: 14, width: 14 };

  // Handlers
  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onToggle(!active);
  };

  // Markup
  const renderIcon = () => {
    if (action === Action.Bold) return <Bold {...iconProps} />;
    if (action === Action.Italic) return <Italic {...iconProps} />;
    if (action === Action.Underline) return <Underline {...iconProps} />;
    if (action === Action.Strikethrough) {
      return <Strikethrough {...iconProps} />;
    }

    return null;
  };

  return (
    <button className="u-mr-2xs" type="button" onMouseDown={onClick}>
      {renderIcon()}
    </button>
  );
};

export { ToggleStyle };
