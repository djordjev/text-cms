import classnames from 'classnames';
import { createElement, CSSProperties, FC, useMemo } from 'react';

export interface TextProps {
  className?: string;
  text: string;
}

const Text: FC<TextProps> = (props) => {
  const { className, text } = props;

  // Hooks

  // Setup
  const parsed = useMemo(() => JSON.parse(text), [text]);

  // Styles

  // Handlers
  console.log(JSON.parse(text));

  // Markup

  const renderChild = (child: any, index: number) => {
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
      const elem = { primary: 'button', secondary: 'button', link: 'a' };

      const strElem = elem[type as 'primary' | 'secondary' | 'link'];

      const actionClasses = classnames(classes, 'u-btn', {
        'u-btn-primary': type === 'primary',
        'u-btn-secondary': type === 'secondary',
        'u-btn-link': type === 'link'
      });

      return createElement(strElem, { className: actionClasses, style }, text);
    }

    return (
      <span className={classes} key={index} style={style}>
        {text}
      </span>
    );
  };

  const renderBlock = (cnt: any, index: number) => {
    const { children, type } = cnt;

    if (type === 'paragraph') {
      return <p>{children.map(renderChild)}</p>;
    }

    if (type === 'heading') {
      const { level } = cnt;
      const strElem = `h${level}`;

      const elem = createElement(strElem, {}, ...children.map(renderChild));
      return elem;
    }

    return <div key={index}>{JSON.stringify(cnt)}</div>;
  };

  // Short-circuit
  if (!text || !Array.isArray(parsed)) return null;

  return <div className={className}>{parsed.map(renderBlock)}</div>;
};

export { Text };
