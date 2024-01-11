import { Link, useLocation } from '@remix-run/react';
import React from 'react';

export interface FileProps {
  name: string;
}

export const File: React.FC<FileProps> = (props) => {
  const { name } = props;

  // Hooks
  const { pathname } = useLocation();

  // Setup
  const link = `/editor${pathname}/${name}`;

  return (
    <Link className="u-flex u-items-center u-flex-col u-group" to={link}>
      <img
        alt={name}
        height={60}
        loading="lazy"
        src="/images/file.png"
        width={60}
      />
      <span className="group-hover:u-underline">{name}</span>
    </Link>
  );
};
