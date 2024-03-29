import { MetaFunction } from '@remix-run/node';
import { Link, useFetcher, useLoaderData } from '@remix-run/react';
import { IconFileX } from '@tabler/icons-react';
import classnames from 'classnames';
import { FC, useState } from 'react';

import { ErrorBoundary } from '~/components/global/ErrorBoundary';
import { Variation } from '~/components/viewer/Variation';
import { VariationsDND } from '~/components/viewer/VariationsDND';
import { BUTTON_ACTION } from '~/constants';

import { action } from './action';
import { loader } from './loader';

export interface ViewerProps {}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const info = data?.info;
  const title = info?.name ?? 'Viewer';

  return [{ title }];
};

const Viewer: FC<ViewerProps> = () => {
  // Hooks
  const { info, variations } = useLoaderData<typeof loader>();
  const [reorder, setReorder] = useState(false);
  const fetcher = useFetcher();

  // Setup
  const { id, path } = info;

  // Styles
  const classesEmpty = classnames(
    'u-flex u-items-center u-flex-col u-justify-center',
    'u-w-full u-opacity-45 u-pointer-events-none u-mt-10x'
  );

  // Handlers
  const onReorderClick = () => {
    setReorder(!reorder);
  };

  const onRearrange = (items: { from: string; to: string }) => {
    const data = { [BUTTON_ACTION]: 'rearrange', path, ...items };

    fetcher.submit(data, { method: 'PUT' });
  };

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
    if (!variations.length) return renderEmpty();

    if (!reorder) {
      return variations.map((v) => (
        <Variation key={v.id} fileId={id} variation={v} />
      ));
    }

    return (
      <fetcher.Form method="PUT">
        <VariationsDND
          id={id}
          onDragEnd={onRearrange}
          variations={variations}
        />
      </fetcher.Form>
    );
  };

  return (
    <div className="u-w-full">
      <div className="u-text-lg u-w-full u-flex u-justify-between u-items-center">
        <div className="u-mr-2xs">
          <span className="u-text-primary">File:</span>
          <span className="u-text-primary-100 u-font-bold">{path}</span>
        </div>
        <div>
          <button
            className="u-btn u-btn-outline u-mr-1x"
            onClick={onReorderClick}
            type="button"
          >
            {reorder ? 'Done' : 'Reorder'}
          </button>
          <Link className="u-btn u-btn-accent" to={`/editor/${id}`}>
            Add new variation
          </Link>
        </div>
      </div>

      <div className="u-p-4x">{renderContent()}</div>
    </div>
  );
};

export { action, ErrorBoundary, loader };
export default Viewer;
