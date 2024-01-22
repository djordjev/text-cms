import { BaseEditor, Editor, Element } from 'slate';
import { ReactEditor } from 'slate-react';

import { CustomElement } from '~/components/editor/VariationEditor/types';

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

export { getSelectedStyle };
