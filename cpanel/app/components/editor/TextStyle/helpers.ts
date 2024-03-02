import { BaseEditor, Editor, Element } from 'slate';
import { ReactEditor } from 'slate-react';

import { TEXT_STYLES } from '~/components/editor/TextStyle/constants';
import { CustomElement } from '~/types/editor';

const getSelectedStyleOption = (selected?: CustomElement) => {
  if (!selected) return TEXT_STYLES[TEXT_STYLES.length - 1].id;

  const { type } = selected;

  if (type === 'heading') {
    const { level = 3 } = selected;
    return `${type}_${level}`;
  }

  return type;
};

const getSelectedStyle = (editor: BaseEditor & ReactEditor) => {
  const { selection } = editor;

  if (!selection) return;

  const [match] = Array.from(
    Editor.nodes<CustomElement>(editor, {
      at: selection,
      match: (n) =>
        !Editor.isEditor(n) &&
        Element.isElement(n) &&
        (n.type === 'paragraph' || n.type === 'heading')
    })
  );

  const [nodeType] = match;

  return nodeType;
};
export { getSelectedStyle, getSelectedStyleOption };
