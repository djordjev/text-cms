import { PrismaClient } from '@prisma/client';
import homeSeed from './home.json' assert { type: 'json' };
import Redis from 'ioredis';

const client = new PrismaClient();
const redis = new Redis(process.env.REDIS_URL);

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

  const homeName = 'Home.txt';
  const home = await client.fsNode.findFirst({
    where: { path: `/${homeName}` }
  });

  if (!home) {
    await client.fsNode.create({
      data: {
        name: homeName,
        path: `/${homeName}`,
        type: { connect: { id: folder.id } },
        parent: { connect: { id: root.id } }
      }
    });
  }

  const homeContent = await redis.get(`/${homeName}`);
  if (!homeContent) {
    await redis.set(`/${homeName}`, JSON.stringify(homeSeed));
  }
}

main()
  .then(async () => {
    await client.$disconnect();
    console.log('SEEDING DATABASES SUCCEED');
  })
  .catch(async (e) => {
    console.error('SEEDING DATABASES FAILED');
    console.error(e);

    await client.$disconnect();
  })
  .finally(() => {
    // eslint-disable-next-line no-undef
    process.exit();
  });
