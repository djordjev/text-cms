import { client } from './sql.server';

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

const getContentForPath = async (path: string) => {
  const folder = await client.fsNode.findFirst({
    where: { path },
    include: { children: true }
  });

  if (!folder) return [];

  return folder.children;
};

export { add, getContentForPath };
