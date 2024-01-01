import { Link } from "@remix-run/react";
import React from "react";

export interface FolderProps {
  name: string;
}

export const Folder: React.FC<FolderProps> = (props) => {
  const { name } = props;

  return (
    <Link
      className="u-flex u-flex-col u-items-center u-group"
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
      <span className="group-hover:u-underline">{name}</span>
    </Link>
  );
};
