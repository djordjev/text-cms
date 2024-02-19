import { FC, MouseEvent, ReactNode, useEffect, useState } from 'react';

import { isZero } from './helpers';

export interface ContextMenuControllerProps {
  children: ReactNode;
  className?: string;
  renderContextMenu: () => ReactNode;
}

const ContextMenuController: FC<ContextMenuControllerProps> = (props) => {
  const { children, className, renderContextMenu } = props;

  // Hooks
  const [point, setPoint] = useState({ x: 0, y: 0 });

  // Handlers
  const onRightClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setPoint({ x: e.pageX, y: e.pageY });
  };

  // Markup
  const renderContextMenuWrapper = () => {
    if (isZero(point)) return null;

    return (
      <div
        className="u-absolute u-z-50"
        style={{ top: point.y, left: point.x }}
      >
        {renderContextMenu()}
      </div>
    );
  };

  // Life-cycle
  useEffect(() => {
    const handleClick = () => setPoint({ x: 0, y: 0 });
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <>
      <div className={className} onContextMenu={onRightClick}>
        {children}
      </div>
      {renderContextMenuWrapper()}
    </>
  );
};

export { ContextMenuController };
