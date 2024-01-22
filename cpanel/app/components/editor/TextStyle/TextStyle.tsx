import React, { FC } from 'react';
import { useSlate } from 'slate-react';

import { getSelectedStyleOption } from '~/components/editor/TextStyle/helpers';
import { CustomElement } from '~/components/editor/VariationEditor/types';

import { TEXT_STYLES } from './constants';
import { getSelectedStyle } from './utils';

export interface TextStyleProps {
  onChange: (selected: Partial<CustomElement>) => void;
}

const TextStyle: FC<TextStyleProps> = (props) => {
  const { onChange } = props;

  // Hooks
  const editor = useSlate();

  // Setup
  const selectedStyle = getSelectedStyle(editor);
  const selected = getSelectedStyleOption(selectedStyle);

  // Handler
  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.currentTarget.value;

    if (id === 'paragraph') {
      onChange({ type: id });
      return;
    }

    const level = id.split('_')[1] ?? '3';
    onChange({ level: Number.parseInt(level, 10), type: 'heading' });
  };

  return (
    <select
      className={'u-bg-gray-1'}
      onChange={onChangeHandler}
      value={selected}
    >
      {TEXT_STYLES.map((style) => (
        <option key={style.id} value={style.id}>
          {style.name}
        </option>
      ))}
    </select>
  );
};

export { TextStyle };
