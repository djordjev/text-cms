import { FsNode } from '@prisma/client';

const newNode = (prototype?: Partial<FsNode>, children?: Partial<FsNode>[]) => {
  // eslint-disable-next-line
  const result: any = {
    createdAt: prototype?.createdAt ?? new Date(2024, 2, 6, 12, 12, 12, 12),
    id: prototype?.id ?? 1,
    name: prototype?.name ?? 'random_name',
    parentId: prototype?.parentId ?? 1001,
    path: prototype?.path ?? '/randompath',
    typeId: prototype?.typeId ?? 1
  };

  if (children) {
    result.children = [];

    for (const child of children) {
      const newChild = {
        createdAt: child?.createdAt ?? new Date(2024, 2, 6, 12, 12, 12, 12),
        id: child?.id ?? 1,
        name: child?.name ?? 'random_name',
        parentId: child?.parentId ?? 1001,
        path: child?.path ?? '/randompath',
        typeId: child?.typeId ?? 1
      };

      result.children.push(newChild);
    }
  }

  return result;
};

export { newNode };
