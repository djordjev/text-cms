import classnames from 'classnames';
import React from 'react';
import { RenderLeafProps } from 'slate-react';

import { DEFAULT_TEXT_COLOR } from '~/routes/editor.$fileId.($variationId)/constants';

export interface LeafProps extends RenderLeafProps {}

const Leaf: React.FC<LeafProps> = (props) => {
  const { attributes, children, leaf } = props;

  const classes = classnames({
    'u-font-bold': leaf.bold,
    'u-italic': leaf.italic,
    'u-line-through': leaf.strikethrough,
    'u-underline': leaf.underline
  });

  const style = {
    color: leaf.color ?? DEFAULT_TEXT_COLOR
  };

  // Markup
  const renderChildren = () => {
    if (!leaf.click) return children;

    const { action = 'unset', href = 'unset', type } = leaf.click;
    const actionType = type === 'link' ? 'link' : `${type} button`;
    const tooltip = `Displays ${actionType} with action attribute: ${action} and link to ${href}`;

    return (
      <span className="u-tooltip u-bg-info u-rounded-md" data-tip={tooltip}>
        {children}
      </span>
    );
  };

  return (
    <span className={classes} style={style} {...attributes}>
      {renderChildren()}
    </span>
  );
};

export { Leaf };
