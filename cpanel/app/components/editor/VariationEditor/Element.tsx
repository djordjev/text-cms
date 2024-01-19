import React from 'react';
import { RenderElementProps } from 'slate-react';

const Element: React.FC<RenderElementProps> = (props) => {
  const { attributes, children, element } = props;

  if (element.type === 'heading') {
    return (
      <h3 {...attributes} style={{ fontSize: '22px' }}>
        {children}
      </h3>
    );
  }

  console.log('WARNING');
  return <p {...attributes}>{children}</p>;
};

export { Element };
