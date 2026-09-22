import { Prisma, PrismaClient } from '@prisma/generated';

export type PrismaInstance = PrismaClient | Prisma.TransactionClient;
