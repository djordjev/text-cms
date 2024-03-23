import { NavLink } from '@remix-run/react';
import { IconFolderOpen, IconHome, IconUserCircle } from '@tabler/icons-react';
import classnames from 'classnames';
import React from 'react';

export interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = (props) => {
  const { className } = props;

  // Styles
  const classes = classnames('u-navbar u-bg-base-100 u-glass', className);
  const classesMenuItem = 'u-mr-3x u-flex u-items-center';

  const classesNav = ({ isActive }: { isActive: boolean }) => {
    return classnames(classesMenuItem, {
      'u-text-primary': isActive
    });
  };

  return (
    <nav className={classes}>
      <p className="u-text-xl u-font-bold u-text-primary-content u-mr-5x u-hidden md:u-block">
        TextCMS
      </p>
      <div className="u-navbar-start">
        <NavLink className={classesNav} to="/">
          <IconHome className="u-mr-1x" />
          Home
        </NavLink>

        <NavLink className={classesNav} to="/finder">
          <IconFolderOpen className="u-mr-1x" />
          Finder
        </NavLink>
      </div>

      <div className="u-navbar-end">
        <NavLink className={classesNav} to="/login">
          <IconUserCircle className="u-mr-1x" />
          Account
        </NavLink>
      </div>
    </nav>
  );
};

export { Header };
