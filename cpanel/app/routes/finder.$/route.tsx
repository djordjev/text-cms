import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  type MetaFunction
} from '@remix-run/node';
import { useLoaderData, useSearchParams } from '@remix-run/react';

import { add, getContentForPath } from '~/api/finder';
import { Actions } from '~/components/finder/Actions';
import { Breadcrumbs } from '~/components/finder/Breadcrumbs';
import { File } from '~/components/finder/File';
import { Folder } from '~/components/finder/Folder';
import { NewFile } from '~/components/modals/NewFile';
import { CreateParam } from '~/types';

export const meta: MetaFunction = () => {
  return [
    { title: 'TextCMS Finder' },
    { name: 'description', content: 'Find text file' }
  ];
};

export const loader = (args: LoaderFunctionArgs) => {
  const { params } = args;

  const path = params['*'] ?? '/';

  return getContentForPath(path);
};

export const action = async (args: ActionFunctionArgs) => {
  const { params, request } = args;

  const path = params['*'];

  const data = await request.formData();

  const type = data.get('type') as CreateParam;
  const name = data.get('name') as string;

  add(path, name, type);

  return null;
};

const Finder = () => {
  const structure = useLoaderData<typeof loader>();
  const [params, setParams] = useSearchParams();

  const createParam = params.get('new');
  const isCreateModalOpen = ['file', 'folder'].includes(createParam ?? '');

  // Handlers
  const onClose = () => {
    params.delete('new');
    setParams(params);
  };

  // Markup
  const renderFileOrFolder = (name: string) => {
    if (name.endsWith('.txt')) return <File key={name} name={name} />;

    return <Folder key={name} name={name} />;
  };

  return (
    <>
      <div className="u-p-3xs">
        <Breadcrumbs />
        <Actions />

        <div className="u-mt-5x u-flex u-flex-wrap u-gap-5x">
          {structure.map(renderFileOrFolder)}
        </div>
      </div>

      <NewFile
        onClose={onClose}
        open={isCreateModalOpen}
        type={createParam as CreateParam}
      />
    </>
  );
};

export default Finder;
