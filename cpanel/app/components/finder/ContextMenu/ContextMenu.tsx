import { Link } from '@remix-run/react';
import { IconFilePlus, IconFolderPlus } from '@tabler/icons-react';
import { FC } from 'react';

export interface ContextMenuProps {}

const YELLOW = '#f5c24a';
const BLUE = '#5ab1e0';

const ContextMenu: FC<ContextMenuProps> = () => {
  return (
    <ul className="u-menu u-bg-base-200 u-w-2z u-rounded-box">
      <li>
        <Link
          className="hover:u-underline u-flex u-items-center"
          to="?action=new-folder"
        >
          <IconFolderPlus color={YELLOW} />
          New Folder
        </Link>
      </li>
      <li>
        <Link
          className="hover:u-underline u-flex u-items-center"
          to="?action=new-file"
        >
          <IconFilePlus color={BLUE} />
          New File
        </Link>
      </li>
    </ul>
  );
};

export { ContextMenu };
