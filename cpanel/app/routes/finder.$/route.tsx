import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  type MetaFunction
} from '@remix-run/node';
import { useLoaderData, useSearchParams } from '@remix-run/react';
import { MouseEvent } from 'react';

import { add, getContentForPath } from '~/api/finder';
import { Breadcrumbs } from '~/components/finder/Breadcrumbs';
import { ContextMenu } from '~/components/finder/ContextMenu';
import { File } from '~/components/finder/File';
import { FileFolderMenu } from '~/components/finder/FileFolderMenu';
import { Folder } from '~/components/finder/Folder';
import { NewFile } from '~/components/modals/NewFile';
import { useContextMenu } from '~/hooks/finder/useContextMenu';
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
  const { contextMenu, onRightClick } = useContextMenu();

  const createParam = params.get('new');
  const isCreateModalOpen = ['file', 'folder'].includes(createParam ?? '');

  // Handlers
  const onClose = () => {
    params.delete('new');
    setParams(params);
  };

  const onFileOrFolderContextMenu = (e: MouseEvent<HTMLElement>) => {
    onRightClick(e, () => <FileFolderMenu path={'dsa'} />);
  };

  const onBackgroundContextMenu = (e: MouseEvent<HTMLElement>) => {
    onRightClick(e, () => <ContextMenu />);
  };

  // Markup
  const renderFileOrFolder = (name: string) => {
    const isFile = name.endsWith('.txt');
    const Component = isFile ? File : Folder;

    return (
      <div
        className="u-self-start u-w-1z u-max-w-1z"
        key={name}
        onContextMenu={onFileOrFolderContextMenu}
      >
        <Component name={name} />
      </div>
    );
  };

  return (
    <>
      <div className="u-flex u-flex-col u-flex-grow">
        <Breadcrumbs />
        {contextMenu}

        <div
          className="u-mt-5x u-flex u-flex-grow u-flex-wrap"
          onContextMenu={onBackgroundContextMenu}
        >
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
