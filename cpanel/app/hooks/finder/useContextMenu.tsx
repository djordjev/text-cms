import { MouseEvent, ReactNode, useEffect, useState } from 'react';

const useContextMenu = () => {
  // Hooks
  const [contextMenu, setContextMenu] = useState<ReactNode | null>(null);

  // Handlers
  const onRightClick = (
    e: MouseEvent<HTMLElement>,
    renderMenu: () => ReactNode
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const menu = (
      <div
        className="u-absolute u-z-50"
        style={{ top: e.pageY, left: e.pageX }}
      >
        {renderMenu()}
      </div>
    );

    setContextMenu(menu);
  };

  // Life-cycle
  useEffect(() => {
    const handleClick = () => setContextMenu(null);
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return { contextMenu, onRightClick };
};

export { useContextMenu };
