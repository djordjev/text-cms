import { Descendant } from 'slate';

export const INITIAL_VALUE: Descendant[] = [
  { type: 'heading', children: [{ text: 'HEADING' }], level: 3 },
  { type: 'paragraph', children: [{ text: 'A line of text in a paragraph.' }] }
];

export const DEFAULT_TEXT_COLOR = '#000';
