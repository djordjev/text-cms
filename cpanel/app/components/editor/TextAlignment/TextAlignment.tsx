import {
  IconAlignCenter,
  IconAlignLeft,
  IconAlignRight
} from '@tabler/icons-react';
import classnames from 'classnames';
import { FC } from 'react';
import { useSlate } from 'slate-react';

import { getSelectedStyle } from '~/components/editor/TextStyle/helpers';
import { Alignment, CustomElement } from '~/types/editor';

export interface TextAlignmentProps {
  className?: string;
  onChange: (selected: Partial<CustomElement>) => void;
}

const TextAlignment: FC<TextAlignmentProps> = (props) => {
  const { className, onChange } = props;

  // Hooks
  const editor = useSlate();
  const selectedStyle = getSelectedStyle(editor);
  const selected = selectedStyle?.align ?? 'left';

  // Styles
  const classesLeft = classnames('u-p-1xs', {
    'u-bg-accent u-rounded-md': selected === 'left'
  });

  const classesCenter = classnames('u-p-1xs', {
    'u-bg-accent u-rounded-md': selected === 'center'
  });

  const classesRight = classnames('u-p-1xs', {
    'u-bg-accent u-rounded-md': selected === 'right'
  });

  // Handlers
  const onChangeHandler = (alignment: Alignment) => () => {
    onChange({ align: alignment });
  };

  return (
    <div className={className}>
      <button
        aria-label="Left"
        className={classesLeft}
        onClick={onChangeHandler('left')}
        type="button"
      >
        <IconAlignLeft />
      </button>
      <button
        aria-label="Center"
        className={classesCenter}
        onClick={onChangeHandler('center')}
        type="button"
      >
        <IconAlignCenter />
      </button>
      <button
        aria-label="Right"
        className={classesRight}
        onClick={onChangeHandler('right')}
        type="button"
      >
        <IconAlignRight />
      </button>
    </div>
  );
};

export { TextAlignment };
