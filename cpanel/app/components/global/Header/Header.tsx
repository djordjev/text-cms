import { NavLink } from "@remix-run/react";
import classnames from "classnames";
import React from "react";

export interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  // Styles
  const classesMenuItem = "u-mr-3x u-flex u-items-center";

  const classesNav = ({ isActive }: { isActive: boolean }) => {
    return classnames(classesMenuItem, {
      "u-text-primary-300": isActive,
    });
  };

  return (
    <nav className="u-h-8xs u-shadow-md u-flex u-items-center u-px-3x">
      <div className="u-flex-1 u-flex u-items-center">
        <NavLink className={classesNav} to="/">
          <img
            alt="home"
            className="u-mr-1x u-inline-block"
            src="/svg/home.svg"
            height={26}
            width={26}
            loading="lazy"
          />
          Home
        </NavLink>

        <NavLink className={classesNav} to="/finder">
          <img
            alt="home"
            className="u-mr-1x u-inline-block"
            src="/svg/folder.svg"
            height={26}
            width={26}
            loading="lazy"
          />
          Finder
        </NavLink>
      </div>

      <div className="u-flex-none">Account</div>
    </nav>
  );
};

export { Header };
