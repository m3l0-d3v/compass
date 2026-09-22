import { PrismaClient } from "@prisma/generated";
import { ITXClientDenyList } from "@prisma/client/runtime/client";

export type PrismaTransaction = Omit<PrismaClient, ITXClientDenyList>;
