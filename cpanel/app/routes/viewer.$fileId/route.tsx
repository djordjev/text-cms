import { MetaFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { IconFileX } from '@tabler/icons-react';
import classnames from 'classnames';
import { FC } from 'react';

import { loader } from './loader';

export interface ViewerProps {}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const info = data?.info;
  const title = info?.name ?? 'Viewer';

  return [{ title }];
};

const Viewer: FC<ViewerProps> = () => {
  // Hooks
  const { content, info } = useLoaderData<typeof loader>();

  // Setup
  const { id, path } = info;

  // Styles
  const classesEmpty = classnames(
    'u-flex u-items-center u-flex-col u-justify-center',
    'u-w-full u-opacity-45 u-pointer-events-none u-mt-10x'
  );

  // Handlers

  // Markdown
  const renderEmpty = () => {
    return (
      <div className={classesEmpty}>
        <p className="u-text-xl u-text-primary u-font-bold u-text-center">
          This file does not have any content.
        </p>
        <IconFileX height={220} width={220} />
      </div>
    );
  };

  const renderContent = () => {
    if (!content) return renderEmpty();

    return null;
  };

  // Life-cycle

  // Short-circuit

  return (
    <div className="u-w-full">
      <div className="u-text-lg u-w-full u-flex u-justify-between u-items-center">
        <div className="u-mr-2xs">
          <span className="u-text-primary">File:</span>
          <span className="u-text-primary-100 u-font-bold">{path}</span>
        </div>
        <div>
          <Link className="u-btn u-btn-accent" to={`/editor/${id}`}>
            Add new variation
          </Link>
        </div>
      </div>

      {renderContent()}
    </div>
  );
};

export { loader };
export default Viewer;
