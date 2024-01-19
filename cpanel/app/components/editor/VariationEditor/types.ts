import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';

export enum Action {
  Bold = 'bold',
  Italic = 'italic',
  Underline = 'underline',
  Strikethrough = 'strikethrough',
  Color = 'color'
}

type StrAct = Action.Color;
type BoolAct = Exclude<Action, StrAct>;

export type ParagraphElement = {
  type: 'paragraph';
  children: CustomText[];
};

export type HeadingElement = {
  type: 'heading';
  level: number;
  children: CustomText[];
};

export type CustomElement = ParagraphElement | HeadingElement;

type StringActions = { [key in StrAct]?: string };
type BoolActions = { [key in BoolAct]?: boolean };

type CustomText = { text: string } & BoolActions & StringActions;

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
