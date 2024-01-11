import React from 'react';
import { RenderLeafProps } from 'slate-react';
import { Action } from './types';

const Leaf: React.FC<RenderLeafProps> = (props) => {
  const { attributes, children, leaf } = props;

  let content = children;

  if (Action.Bold in leaf && leaf.bold) {
    content = <span className="u-font-bold">{children}</span>;
  }

  if (Action.Italic in leaf && leaf.italic) {
    content = <span className="u-italic">{children}</span>;
  }

  if (Action.Underline in leaf && leaf.underline) {
    content = <span className="u-underline">{children}</span>;
  }

  if (Action.Strikethrough in leaf && leaf.strikethrough) {
    content = <span className="u-line-through">{children}</span>;
  }

  if (Action.Color in leaf && leaf.color) {
    console.log(leaf);

    content = <span style={{ color: leaf.color as any }}>{children}</span>;
  }

  return <span {...attributes}>{content}</span>;
};

export { Leaf };
