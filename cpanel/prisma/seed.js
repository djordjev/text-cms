import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

async function main() {
  await client.fsNodeType.upsert({
    where: { name: 'file' },
    create: { id: 1, name: 'file' },
    update: { id: 1, name: 'file' }
  });

  const folder = await client.fsNodeType.upsert({
    where: { name: 'folder' },
    create: { id: 2, name: 'folder' },
    update: { id: 2, name: 'folder' }
  });

  const rootFolder = {
    name: '/',
    path: '/',
    type: { connect: { id: folder.id } },
    parent: {}
  };

  await client.fsNode.upsert({
    where: { path: '/', name: '/' },
    create: rootFolder,
    update: rootFolder
  });
}

main()
  .then(async () => {
    await client.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);

    await client.$disconnect();
    // eslint-disable-next-line no-undef
    process.exit();
  });
