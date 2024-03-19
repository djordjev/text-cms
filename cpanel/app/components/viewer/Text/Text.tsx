import classnames from 'classnames';
import { createElement, CSSProperties, FC, useMemo } from 'react';
import { Element } from 'slate';

import { CustomElement, CustomText } from '~/types/editor';

export interface TextProps {
  className?: string;
  text: string;
}

const Text: FC<TextProps> = (props) => {
  const { className, text } = props;

  // Setup
  const parsed = useMemo(() => JSON.parse(text), [text]);
  console.log(parsed);

  // Markup
  const renderLeaf = (child: CustomText, index: number) => {
    const { click, text } = child;

    const classes = classnames({
      'u-font-bold': child.bold,
      'u-italic': child.italic,
      'u-line-through': child.strikethrough,
      'u-underline': child.underline
    });

    const style: CSSProperties = {};
    if (child.color) {
      style.color = child.color;
    }

    if (click) {
      const { type } = click;

      const actionClasses = classnames(classes, {
        'u-btn u-btn-primary': type === 'primary',
        'u-btn u-btn-secondary': type === 'secondary',
        'u-link u-link-primary': type === 'link'
      });

      const onClick = () =>
        alert(`Clicked action element with action: ${click.action}`);

      const commonProps = {
        className: actionClasses,
        onClick,
        key: index,
        style
      };

      switch (type) {
        case 'link':
          return (
            <a
              {...commonProps}
              href={click.href}
              rel="noreferrer"
              target="_blank"
            >
              {text}
            </a>
          );
        case 'primary':
        case 'secondary':
          return <button {...commonProps}>{text}</button>;
        default:
          throw new Error('unknown type');
      }
    }

    return (
      <span className={classes} key={index} style={style}>
        {text}
      </span>
    );
  };

  const renderElement = (cnt: CustomElement | CustomText, index: number) => {
    if (!Element.isElement(cnt)) {
      return renderLeaf(cnt, index);
    }

    const { align, children, type } = cnt;

    let elem: string;

    switch (type) {
      case 'heading':
        elem = `h${cnt.level}`;
        break;
      case 'paragraph':
        elem = 'p';
        break;
      case 'template':
        elem = 'span';
        break;
      default:
        return null;
    }

    const blockClasses = classnames({
      'u-text-left': align === 'left',
      'u-text-center': align === 'center',
      'u-text-right': align === 'right',
      'u-text-4xl': elem === 'h1',
      'u-text-3xl': elem === 'h2',
      'u-text-lg': elem === 'h3',
      'u-text-md': elem === 'h4',
      'u-text-sm': elem === 'h5',
      'u-text-xs': elem === 'h6'
    });

    return createElement(
      elem,
      { className: blockClasses, key: index },
      ...children.map(renderElement)
    );
  };

  // Short-circuit
  if (!text || !Array.isArray(parsed)) return null;

  return <div className={className}>{parsed.map(renderElement)}</div>;
};

export { Text };
