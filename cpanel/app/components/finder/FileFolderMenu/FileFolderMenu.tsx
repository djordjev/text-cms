import { Link } from '@remix-run/react';
import { IconSquareX } from '@tabler/icons-react';
import { FC } from 'react';

export interface FileFolderMenuProps {
  path: string;
}

const FileFolderMenu: FC<FileFolderMenuProps> = (props) => {
  const { path } = props;

  console.log(path);

  return (
    <ul className="u-menu u-bg-base-200 u-w-2z u-rounded-box">
      <li>
        <Link
          className="hover:u-underline u-flex u-items-center"
          to="?action=delete"
        >
          <IconSquareX color="red" />
          Delete
        </Link>
      </li>
    </ul>
  );
};

export { FileFolderMenu };
