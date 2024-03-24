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

  let root = await client.fsNode.findFirst({ where: { name: '/' } });
  if (!root) {
    root = await client.fsNode.create({
      data: {
        name: '/',
        path: '/',
        type: { connect: { id: folder.id } },
        parent: {}
      }
    });
  }

  const home = await client.fsNode.findFirst({ where: { path: '/Home.txt' } });
  if (!home) {
    await client.fsNode.create({
      data: {
        name: 'Home.txt',
        path: '/Home.txt',
        type: { connect: { id: folder.id } },
        parent: { connect: { id: root.id } }
      }
    });
  }
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
