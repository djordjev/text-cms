import { Link } from '@remix-run/react';
import React from 'react';

export interface FolderProps {
  name: string;
}

export const Folder: React.FC<FolderProps> = (props) => {
  const { name } = props;

  // Styles
  const classesName = `group-hover:u-underline u-max-w-full u-text-ellipsis u-overflow-hidden u-text-nowrap`;

  return (
    <Link
      className="u-flex u-flex-col u-items-center u-group u-w-1z u-max-w-1z"
      relative="path"
      to={name}
    >
      <img
        alt={name}
        height={60}
        loading="lazy"
        src="/images/folder.png"
        width={60}
      />
      <span className={classesName}>{name}</span>
    </Link>
  );
};
