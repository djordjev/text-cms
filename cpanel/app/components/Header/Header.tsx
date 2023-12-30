import React from "react";
import { Link, NavLink } from "@remix-run/react";
import classnames from "classnames";

export interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  // Styles
  const classesFinder = ({ isActive }: { isActive: boolean }) => {
    return classnames("u-btn u-btn-ghost", {
      "u-border-solid u-border-black": isActive,
    });
  };

  return (
    <nav className="u-navbar u-bg-base-300">
      <div className="u-flex-1">
        <Link className="u-btn u-btn-ghost u-text-xl" to="/">
          Home
        </Link>

        <NavLink className={classesFinder} to="/finder">
          Finder
        </NavLink>
      </div>

      <div className="u-flex-none">
        <div
          className="u-btn u-btn-ghost u-btn-circle u-avatar"
          role="button"
          tabIndex={0}
        >
          <div className="u-w-10 u-rounded-full">
            <img
              alt="Profile"
              src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export { Header };
