import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';

export enum Action {
  Bold = 'bold',
  Click = 'click',
  Color = 'color',
  Italic = 'italic',
  Strikethrough = 'strikethrough',
  Underline = 'underline'
}

type StrAct = Action.Color;
type BoolAct = Exclude<Action, StrAct>;
type ClickAct = Action.Click;

export type Alignment = 'left' | 'center' | 'right';

export type ElementCommon = {
  align?: Alignment;
};

export type ParagraphElement = {
  type: 'paragraph';
  children: CustomText[];
} & ElementCommon;

export type HeadingElement = {
  type: 'heading';
  level: number;
  children: CustomText[];
} & ElementCommon;

export type CustomElement = ParagraphElement | HeadingElement;

export type ClickActionPayload = {
  action?: string;
  href?: string;
  type: 'link' | 'primary' | 'secondary';
};

type StringActions = { [key in StrAct]?: string };
type BoolActions = { [key in BoolAct]?: boolean };
type ClickActions = { [key in ClickAct]?: ClickActionPayload };

export type AnyAction = string | boolean | ClickActionPayload;

export type CustomText = { text: string } & BoolActions &
  StringActions &
  ClickActions;

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
