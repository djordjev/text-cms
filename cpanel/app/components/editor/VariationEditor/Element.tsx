import React from 'react';
import { RenderElementProps } from 'slate-react';

const Element: React.FC<RenderElementProps> = (props) => {
  const { children } = props;

  return <p>{children}</p>;
};

export { Element };
