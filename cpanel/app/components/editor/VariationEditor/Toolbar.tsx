import classnames from 'classnames';
import * as React from 'react';

import { Action } from './types';

export interface ToolbarProps {
  onClick: (action: Action) => void;
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
    </div>
  );
};

export { Toolbar };
