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

  // Styles
  const classesName = `group-hover:u-underline u-max-w-full u-text-ellipsis u-overflow-hidden u-text-nowrap`;

  return (
    <Link className="u-flex u-items-center u-flex-col u-group" to={link}>
      <img
        alt={name}
        height={60}
        loading="lazy"
        src="/images/file.png"
        width={60}
      />
      <span className={classesName}>{name}</span>
    </Link>
  );
};
