import { Link } from '@remix-run/react';

const Actions = () => {
  return (
    <div className="u-mt-2xs u-flex u-gap-2xs u-text-primary-300">
      <Link
        className="hover:u-underline u-flex u-items-center"
        to="?new=folder"
      >
        <img
          alt="new folder"
          className="u-mr-1xs"
          height={20}
          loading="lazy"
          src="/svg/folder-plus.svg"
          width={20}
        />
        New Folder
      </Link>
      <div className="u-mx-1x">|</div>
      <Link className="hover:u-underline u-flex u-items-center" to="?new=file">
        <img
          alt="new folder"
          className="u-mr-1xs"
          height={20}
          loading="lazy"
          src="/svg/plus.svg"
          width={20}
        />
        New File
      </Link>
    </div>
  );
};

export { Actions };
