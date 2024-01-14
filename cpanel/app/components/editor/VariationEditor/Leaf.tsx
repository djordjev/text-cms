import classnames from 'classnames';
import React from 'react';
import { RenderLeafProps } from 'slate-react';

const Leaf: React.FC<RenderLeafProps> = (props) => {
  const { attributes, children, leaf } = props;

  const classes = classnames({
    'u-font-bold': leaf.bold,
    'u-italic': leaf.italic,
    'u-line-through': leaf.strikethrough,
    'u-underline': leaf.underline
  });

  const style = {
    color: leaf.color ?? '#000'
  };

  return (
    <span className={classes} style={style} {...attributes}>
      {children}
    </span>
  );
};

export { Leaf };
