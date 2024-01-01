import { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { getContentForPath } from '~/api/finder';
import { Breadcrumbs } from '~/components/finder/Breadcrumbs';
import { File } from '~/components/finder/File';
import { Folder } from '~/components/finder/Folder';

export const loader = (args: LoaderFunctionArgs) => {
  const { params } = args;

  const path = params['*'] ?? '/';

  return getContentForPath(path);
};

const Finder = () => {
  const structure = useLoaderData<typeof loader>();

  // Markup
  const renderFileOrFolder = (name: string) => {
    if (name.endsWith('.txt')) return <File key={name} name={name} />;

    return <Folder key={name} name={name} />;
  };

  return (
    <div className="u-p-3xs">
      <Breadcrumbs />
      <div>Actions</div>

      <div className="u-mt-5x u-flex u-flex-wrap u-gap-5x">
        {structure.map(renderFileOrFolder)}
      </div>
    </div>
  );
};

export default Finder;
