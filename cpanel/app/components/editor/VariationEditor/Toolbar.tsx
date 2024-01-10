import { Popover } from '@headlessui/react';
import { ColorResult } from '@uiw/color-convert';
import Block from '@uiw/react-color-block';
import classnames from 'classnames';
import React from 'react';

import { Action } from './types';

export interface ToolbarProps {
  onClick: (action: Action, value?: string) => void;
}

const Toolbar: React.FC<ToolbarProps> = (props) => {
  const { onClick } = props;

  // Styles
  const classesLayout = `u-bg-gray-1 u-border-b u-border-solid u-border-primary-100 u-mb-2x u-p-2xs`;

  const classes = classnames(classesLayout);

  const classesButton = 'u-mx-1x';

  // Handlers
  const onClickHandler = (action: Action) => () => {
    onClick(action);
  };

  const onPickColor = (color: ColorResult) => {
    onClick(Action.Color, color.hex);
  };

  return (
    <div className={classes}>
      <button
        className={classesButton}
        type="button"
        onClick={onClickHandler(Action.Bold)}
      >
        Bold
      </button>
      <button
        className={classesButton}
        type="button"
        onClick={onClickHandler(Action.Italic)}
      >
        Italic
      </button>
      <button
        className={classesButton}
        type="button"
        onClick={onClickHandler(Action.Underline)}
      >
        Underline
      </button>
      <button
        className={classesButton}
        type="button"
        onClick={onClickHandler(Action.Strikethrough)}
      >
        Strikethrough
      </button>
      <Popover className="u-inline-block u-mx-1x">
        <Popover.Button>Color</Popover.Button>
        <Popover.Panel className="u-absolute u-z-10">
          <Block color={'#fff'} onChange={onPickColor} />
        </Popover.Panel>
      </Popover>
    </div>
  );
};

export { Toolbar };
