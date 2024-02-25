import { useLoaderData } from '@remix-run/react';
import { FC } from 'react';

import { loader } from './loader';
export interface ViewerProps {}

const Viewer: FC<ViewerProps> = () => {
  // Hooks
  const data = useLoaderData<typeof loader>();

  // Setup
  const { path } = data;

  // Styles
  // const classes = classnames('', className);

  // Handlers

  // Markdown

  // Life-cycle

  // Short-circuit

  return (
    <div className="u-w-full">
      <div className="u-text-lg u-text-center u-w-full">
        <span className="u-text-primary u-mr-2xs">File:</span>
        <span className="u-text-primary-100 u-font-bold">{path}</span>
      </div>
    </div>
  );
};

export { loader };
export default Viewer;
