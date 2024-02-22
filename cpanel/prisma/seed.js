import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

async function main() {
  const types = ['file', 'folder'];

  for (const [index, name] of types.entries()) {
    const existing = await client.fsNodeType.findFirst({ where: { name } });
    if (!existing) {
      await client.fsNodeType.create({ data: { id: index + 1, name } });
    }
  }
}

main()
  .then(async () => {
    await client.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);

    await client.$disconnect();
    process.exit();
  });
