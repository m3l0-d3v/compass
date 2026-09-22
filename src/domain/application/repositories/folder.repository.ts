import { FolderEntity } from "@/domain/enterprise/entities/folder.entity";
import { Prisma } from "@prisma/generated";

export abstract class IFolderRepository {
  abstract findMany(args?: Prisma.FolderFindManyArgs): Promise<FolderEntity[]>;
  abstract findUnique(
    args: Prisma.FolderFindUniqueArgs,
  ): Promise<FolderEntity | null>;
  abstract create(args: Prisma.FolderCreateArgs): Promise<FolderEntity>;
  abstract update(args: Prisma.FolderUpdateArgs): Promise<void>;
  abstract softDelete(args: Prisma.FolderDeleteArgs): Promise<void>;
  abstract hardDelete(args: Prisma.FolderDeleteArgs): Promise<void>;
}
