import { NavLink } from '@remix-run/react';
import { IconFolderOpen, IconHome, IconUserCircle } from '@tabler/icons-react';
import classnames from 'classnames';
import React from 'react';

export interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  // Styles
  const classesMenuItem = 'u-mr-3x u-flex u-items-center';

  const classesNav = ({ isActive }: { isActive: boolean }) => {
    return classnames(classesMenuItem, {
      'u-text-primary-300': isActive
    });
  };

  return (
    <nav className="u-h-8xs u-shadow-md u-flex u-items-center u-px-3x u-bg-white">
      <div className="u-flex-1 u-flex u-items-center">
        <NavLink className={classesNav} to="/">
          <IconHome className="u-mr-1x" />
          Home
        </NavLink>

        <NavLink className={classesNav} to="/finder">
          <IconFolderOpen className="u-mr-1x" />
          Finder
        </NavLink>
      </div>

      <div className="u-flex-none">
        <NavLink className={classesNav} to="/account">
          <IconUserCircle className="u-mr-1x" />
          Account
        </NavLink>
      </div>
    </nav>
  );
};

export { Header };
