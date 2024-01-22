import React, { FC } from 'react';
import { useSlate } from 'slate-react';

import { getSelectedStyle } from '~/components/editor/TextStyle/utils';
import {
  Alignment,
  CustomElement
} from '~/components/editor/VariationEditor/types';

export const TEXT_ALIGNMENTS = [
  { id: 'left', name: 'Left' },
  { id: 'center', name: 'Center' },
  { id: 'right', name: 'Right' }
];

export interface TextAlignmentProps {
  onChange: (selected: Partial<CustomElement>) => void;
}

const TextAlignment: FC<TextAlignmentProps> = (props) => {
  const { onChange } = props;

  // Hooks
  const editor = useSlate();
  const selectedStyle = getSelectedStyle(editor);
  const selected = selectedStyle?.align ?? 'left';

  // Handlers
  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value;

    onChange({ align: value as Alignment });
  };

  return (
    <select
      className={'u-bg-gray-1'}
      onChange={onChangeHandler}
      value={selected}
    >
      {TEXT_ALIGNMENTS.map((style) => (
        <option key={style.id} value={style.id}>
          {style.name}
        </option>
      ))}
    </select>
  );
};

export { TextAlignment };
