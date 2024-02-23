import { FsNode } from '@prisma/client';
import { type MetaFunction, SerializeFrom } from '@remix-run/node';
import { useLoaderData, useSearchParams } from '@remix-run/react';
import { IconFoldersOff } from '@tabler/icons-react';
import classnames from 'classnames';
import { MouseEvent } from 'react';

import { Breadcrumbs } from '~/components/finder/Breadcrumbs';
import { ContextMenu } from '~/components/finder/ContextMenu';
import { File } from '~/components/finder/File';
import { FileFolderMenu } from '~/components/finder/FileFolderMenu';
import { Folder } from '~/components/finder/Folder';
import { NewFile } from '~/components/modals/NewFile';
import { useContextMenu } from '~/hooks/finder/useContextMenu';

import { action } from './action';
import { loader } from './loader';
import { getCreateOpenModal } from './utils';

export const meta: MetaFunction = () => {
  return [
    { title: 'TextCMS Finder' },
    { name: 'description', content: 'Find text file' }
  ];
};

const Finder = () => {
  const structure = useLoaderData<typeof loader>();
  const [params, setParams] = useSearchParams();
  const { contextMenu, onRightClick } = useContextMenu();

  const openCreateModal = getCreateOpenModal(params);

  // Styles
  const classesEmpty = classnames(
    'u-flex u-items-center u-flex-col u-justify-center',
    'u-w-full u-opacity-45 u-pointer-events-none'
  );

  // Handlers
  const onClose = () => {
    params.delete('action');
    setParams(params);
  };

  const onFileOrFolderContextMenu = (e: MouseEvent<HTMLElement>) => {
    onRightClick(e, () => <FileFolderMenu path={'dsa'} />);
  };

  const onBackgroundContextMenu = (e: MouseEvent<HTMLElement>) => {
    onRightClick(e, () => <ContextMenu />);
  };

  // Markup
  const renderFileOrFolder = (node: SerializeFrom<FsNode>) => {
    const { name } = node;
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

  const renderFolderContent = () => {
    if (!structure.length) {
      return (
        <div className={classesEmpty}>
          <p className="u-text-xl u-text-primary u-font-bold u-text-center">
            This folder is empty! Right click to create file or folder.
          </p>
          <IconFoldersOff height={220} width={220} />
        </div>
      );
    }

    return structure.map(renderFileOrFolder);
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
          {renderFolderContent()}
        </div>
      </div>

      <NewFile onClose={onClose} type={openCreateModal} />
    </>
  );
};

export { action, loader };
export default Finder;
