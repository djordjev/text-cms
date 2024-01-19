import { Popover } from '@headlessui/react';
import { ColorResult } from '@uiw/color-convert';
import Block from '@uiw/react-color-block';
import classnames from 'classnames';
import React from 'react';
import { Editor, Element, Transforms } from 'slate';
import { useSlate } from 'slate-react';

import { TextStyle } from '~/components/editor/TextStyle';
import { ToggleStyle } from '~/components/editor/ToggleStyle';
import { DEFAULT_TEXT_COLOR } from '~/components/editor/VariationEditor/constants';

import { Action } from './types';

export interface ToolbarProps {
  onClick: (action: Action, value?: string | boolean) => void;
}

const Toolbar: React.FC<ToolbarProps> = (props) => {
  const { onClick } = props;

  // Hooks
  const editor = useSlate();

  // Setup
  const marks = Editor.marks(editor);
  const color = marks?.[Action.Color] ?? DEFAULT_TEXT_COLOR;

  // Styles
  const classesLayout = `u-bg-gray-1 u-border-b u-border-solid u-border-primary-100 u-mb-2x u-p-2xs`;
  const classes = classnames(classesLayout, 'u-flex u-items-center');

  const onToggleClick = (action: Action) => (value: boolean) => {
    onClick(action, value);
  };

  const onPickColor = (color: ColorResult) => {
    onClick(Action.Color, color.hex);
  };

  const onStylePick = (toTransform: any) => {
    Transforms.setNodes<Element>(editor, toTransform);
  };

  return (
    <div className={classes}>
      <ToggleStyle action={Action.Bold} onToggle={onToggleClick(Action.Bold)} />
      <ToggleStyle
        action={Action.Italic}
        onToggle={onToggleClick(Action.Italic)}
      />
      <ToggleStyle
        action={Action.Underline}
        onToggle={onToggleClick(Action.Underline)}
      />
      <ToggleStyle
        action={Action.Strikethrough}
        onToggle={onToggleClick(Action.Strikethrough)}
      />
      <Popover className="u-inline-block u-mx-1x">
        <Popover.Button>
          <div
            className="u-rounded"
            style={{ backgroundColor: color, height: 14, width: 14 }}
          />
        </Popover.Button>
        <Popover.Panel className="u-absolute u-z-10">
          <Block color={'#fff'} onChange={onPickColor} />
        </Popover.Panel>
      </Popover>

      <TextStyle onChange={onStylePick} value={'paragraph'} />
    </div>
  );
};

export { Toolbar };
