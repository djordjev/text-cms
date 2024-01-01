import { Link, useResolvedPath } from '@remix-run/react';
import React from 'react';

import { getPathFromSegments, isFile, isFolder, isHome } from '~/utils/file';

const Breadcrumbs = () => {
  // Hooks
  const { pathname } = useResolvedPath('.');

  // Setup
  const segments = pathname.split('/').filter((p) => p);

  // Markup
  const renderIcon = (path: string) => {
    let icon: string = '';

    if (isFolder(path)) {
      icon = '/svg/folder.svg';
    }

    if (isHome(path)) {
      icon = '/svg/home.svg';
    }

    if (isFile(path)) {
      icon = '/svg/file.svg';
    }

    return (
      <img
        alt=""
        className="u-mr-1x"
        height={20}
        width={20}
        src={icon}
        loading="lazy"
      />
    );
  };

  const renderSegment = (segment: string, index: number) => {
    const isLast = index === segments.length - 1;
    const path = getPathFromSegments(segments, segment);

    return (
      <React.Fragment key={segment}>
        <Link className="hover:u-underline u-flex" to={path}>
          {renderIcon(segment)}
          {isHome(segment) ? 'Home' : segment}
        </Link>
        {!isLast && (
          <img
            alt="folder separator"
            height={20}
            width={20}
            src="/svg/chevron-right.svg"
            loading="lazy"
          />
        )}
      </React.Fragment>
    );
  };

  return <div className="u-flex u-gap-2xs">{segments.map(renderSegment)}</div>;
};

export { Breadcrumbs };
