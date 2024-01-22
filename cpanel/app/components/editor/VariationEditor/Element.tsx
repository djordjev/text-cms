import React from 'react';
import { RenderElementProps } from 'slate-react';

const Element: React.FC<RenderElementProps> = (props) => {
  const { attributes, children, element } = props;

  // Markup
  const renderHeading = (level: number) => {
    // prettier-ignore
    if (level === 1) return <h1 {...attributes} style={{ fontSize: '64px'}}>{children}</h1>;
    // prettier-ignore
    if (level === 2) return <h2 {...attributes} style={{ fontSize: '32px'}}>{children}</h2>;
    // prettier-ignore
    if (level === 3) return <h3 {...attributes} style={{ fontSize: '24px'}}>{children}</h3>;
    // prettier-ignore
    if (level === 4) return <h4 {...attributes} style={{ fontSize: '20px'}}>{children}</h4>;
    // prettier-ignore
    if (level === 5) return <h5 {...attributes} style={{ fontSize: '16px'}}>{children}</h5>;
    // prettier-ignore
    if (level === 6) return <h6 {...attributes} style={{ fontSize: '16px'}}>{children}</h6>;
  };

  if (element.type === 'heading') {
    return renderHeading(element.level);
  }

  return <p {...attributes}>{children}</p>;
};

export { Element };
