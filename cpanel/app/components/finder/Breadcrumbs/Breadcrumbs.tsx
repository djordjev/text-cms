import { Link, useResolvedPath } from '@remix-run/react';
import { IconFile, IconFolderOpen, IconHome } from '@tabler/icons-react';

import { getPathFromSegments, isFolder, isHome } from '~/utils/file';

export interface BreadcrumbsProps {}

const Breadcrumbs = () => {
  // Hooks
  const { pathname } = useResolvedPath('.');

  // Setup
  const segments = pathname.split('/').filter((p) => p);
  const isHomepage = pathname === '/finder';

  // Markup
  const renderIcon = (path: string) => {
    if (isHome(path)) {
      return <IconHome height={18} />;
    }

    if (isFolder(path)) {
      return <IconFolderOpen height={18} />;
    }

    return <IconFile height={18} />;
  };

  const renderSegment = (segment: string) => {
    const path = getPathFromSegments(segments, segment);

    return (
      <li key={segment}>
        <Link className="hover:u-underline u-flex" to={path}>
          {renderIcon(segment)}
          {isHome(segment) ? 'Home' : decodeURI(segment)}
        </Link>
      </li>
    );
  };

  const renderHomeRoute = () => {
    return (
      <div
        className="u-flex u-items-center"
        style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem' }}
      >
        <IconHome className="u-inline" height={18} />
        <span className="u-align-middle u-text-sm">Home</span>
      </div>
    );
  };

  // Short-circuit
  if (isHomepage) return renderHomeRoute();

  return (
    <div className="u-breadcrumbs u-text-sm">
      <ul>{segments.map(renderSegment)}</ul>
    </div>
  );
};

export { Breadcrumbs };
