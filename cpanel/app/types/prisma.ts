import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/binary';

import PrismaClientOptions = Prisma.PrismaClientOptions;

export type Tx = Omit<
  PrismaClient<PrismaClientOptions, never, DefaultArgs>,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>;
