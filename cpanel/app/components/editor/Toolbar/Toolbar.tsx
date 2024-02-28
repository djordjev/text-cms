import React from 'react';
import { Editor, Element, Transforms } from 'slate';
import { useSlate } from 'slate-react';

import { TextActions } from '~/components/editor/TextActions';
import { TextAlignment } from '~/components/editor/TextAlignment';
import { TextStyle } from '~/components/editor/TextStyle';
import { ToggleStyle } from '~/components/editor/ToggleStyle';
import { DEFAULT_TEXT_COLOR } from '~/routes/editor.$fileId.($variationId)/constants';
import {
  Action,
  AnyAction,
  ClickActionPayload,
  CustomElement
} from '~/types/editor';

export interface ToolbarProps {
  onClick: (action: Action, value?: AnyAction) => void;
}

const Toolbar: React.FC<ToolbarProps> = (props) => {
  const { onClick } = props;

  // Hooks
  const editor = useSlate();

  // Setup
  const marks = Editor.marks(editor);
  const color = marks?.[Action.Color] ?? DEFAULT_TEXT_COLOR;

  // Styles
  const classes = `u-flex u-items-center u-bg-base-300 u-mb-2x u-p-2xs`;

  // Handlers
  const onToggleClick = (action: Action) => (value: boolean) => {
    onClick(action, value);
  };

  const onPickColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    onClick(Action.Color, value);
  };

  const onSetClickAction = (payload?: ClickActionPayload) => {
    onClick(Action.Click, payload);
  };

  const onStylePick = (toTransform: Partial<CustomElement>) => {
    Transforms.setNodes<Element>(editor, toTransform);
  };

  const onAlignmentChange = (toTransform: Partial<CustomElement>) => {
    Transforms.setNodes<Element>(editor, toTransform);
  };

  // Markup
  const renderDivider = () => (
    <div className="u-bg-neutral u-mx-2xs" style={{ height: 18, width: 1 }} />
  );

  return (
    <div className={classes}>
      <div className="u-flex u-items-center">
        <ToggleStyle
          action={Action.Bold}
          className="u-mr-1xs"
          onToggle={onToggleClick(Action.Bold)}
        />
        <ToggleStyle
          action={Action.Italic}
          className="u-mr-1xs"
          onToggle={onToggleClick(Action.Italic)}
        />
        <ToggleStyle
          action={Action.Underline}
          className="u-mr-1xs"
          onToggle={onToggleClick(Action.Underline)}
        />
        <ToggleStyle
          action={Action.Strikethrough}
          onToggle={onToggleClick(Action.Strikethrough)}
        />
      </div>

      {renderDivider()}

      <input
        className="u-bg-transparent u-mr-1x"
        onChange={onPickColor}
        type="color"
        value={color}
      />

      {renderDivider()}

      <TextStyle onChange={onStylePick} />

      {renderDivider()}

      <TextAlignment onChange={onAlignmentChange} />

      {renderDivider()}

      <TextActions onClick={onSetClickAction} />
    </div>
  );
};

export { Toolbar };
