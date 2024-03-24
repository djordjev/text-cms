import classnames from 'classnames';
import { createElement, CSSProperties, FC, useMemo } from 'react';

import { CustomElement, CustomText } from '~/types/editor';

export interface TextProps {
  className?: string;
  displayClickAction?: boolean;
  text: string;
}

const Text: FC<TextProps> = (props) => {
  const { className, displayClickAction = true, text } = props;

  // Setup
  const parsed = useMemo(() => JSON.parse(text), [text]);

  // Markup
  const renderChild = (child: CustomText, index: number) => {
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

      const onClick = () => {
        if (!displayClickAction) return;

        alert(`Clicked action element with action: ${click.action}`);
      };

      const commonProps = {
        className: actionClasses,
        onClick,
        key: index,
        style
      };

      const linkProps = displayClickAction
        ? { rel: 'noreferrer', target: '_blank' }
        : {};

      switch (type) {
        case 'link':
          return (
            <a {...commonProps} {...linkProps} href={click.href}>
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

  const renderBlock = (cnt: CustomElement, index: number) => {
    const { align, children, type } = cnt;

    let elem: string;

    switch (type) {
      case 'heading':
        elem = `h${cnt.level}`;
        break;
      case 'paragraph':
        elem = 'p';
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
      ...children.map(renderChild)
    );
  };

  // Short-circuit
  if (!text || !Array.isArray(parsed)) return null;

  return <div className={className}>{parsed.map(renderBlock)}</div>;
};

export { Text };
