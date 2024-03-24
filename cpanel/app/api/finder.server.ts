import { client } from '~/api/sql/sql.server';
import { Tx } from '~/types/prisma';
import { isFile } from '~/utils/file';

const add = async (path: string, name: string, type: string) => {
  const strType = type === 'new-folder' ? 'folder' : 'file';
  const isRoot = path === '/';

  const dbType = await client.fsNodeType.findFirstOrThrow({
    where: { name: strType }
  });

  const suffix = strType === 'folder' ? '' : '.txt';
  const completeName = `${name}${suffix}`;

  const parent = await client.fsNode.findFirst({ where: { path } });
  if (!parent && !isRoot) throw new Error('unable to find parent');

  try {
    const newPath = isRoot ? `/${completeName}` : `${path}/${completeName}`;

    const result = await client.fsNode.create({
      data: {
        name: completeName,
        parent: { connect: parent ?? undefined },
        path: newPath,
        type: { connect: dbType }
      }
    });

    return result;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const removeInTx = async (tx: Tx, file: string) => {
  await tx.fsNode.delete({ where: { path: file } });
};

const getFilesInNode = async (path: string) => {
  if (isFile(path)) return [path];

  const result = await client.fsNode.findMany({
    where: {
      path: {
        startsWith: path,
        endsWith: '.txt'
      }
    }
  });

  return result.map((r) => r.path);
};

const getContentForPath = async (path: string) => {
  const folder = await client.fsNode.findFirst({
    where: { path },
    include: { children: true }
  });

  if (!folder) return null;

  return folder.children;
};

const getFileById = async (id: number) => {
  return client.fsNode.findFirst({ where: { id } });
};

export {
  add,
  client,
  getContentForPath,
  getFileById,
  getFilesInNode,
  removeInTx
};
