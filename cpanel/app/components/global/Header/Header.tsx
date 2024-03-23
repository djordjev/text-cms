import { NavLink } from '@remix-run/react';
import { IconFolderOpen, IconHome, IconUserCircle } from '@tabler/icons-react';
import classnames from 'classnames';
import React, { useContext } from 'react';

import { UserContext } from '~/context';

export interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = (props) => {
  const { className } = props;

  // Hooks
  const { username } = useContext(UserContext);

  // Styles
  const classes = classnames('u-navbar u-bg-base-100 u-glass', className);
  const classesMenuItem = 'u-mr-3x u-flex u-items-center';

  const classesNav = ({ isActive }: { isActive: boolean }) => {
    return classnames(classesMenuItem, {
      'u-text-primary': isActive
    });
  };

  const classesLoggedIn = classnames(classesMenuItem, 'u-text-info');

  // Markup
  const renderAccount = () => {
    if (!username) {
      return (
        <NavLink className={classesNav} to="/login">
          <IconUserCircle className="u-mr-1x" />
          Sign In
        </NavLink>
      );
    }

    return (
      <form
        action="/logout"
        className="u-dropdown u-dropdown-hover"
        method="POST"
      >
        <div tabIndex={0} role="button" className={classesLoggedIn}>
          <IconUserCircle className="u-mr-1x" />
          {username}
        </div>
        <ul className="u-dropdown-content u-z-[1] u-menu u-p-2 u-shadow u-bg-base-100 u-rounded-box u-w-52">
          <li>
            <button type="submit">Log out</button>
          </li>
        </ul>
      </form>
    );
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

      <div className="u-navbar-end">{renderAccount()}</div>
    </nav>
  );
};

export { Header };
