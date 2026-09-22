import { FileEntity } from "@/domain/enterprise/entities/file.entity";
import { Prisma } from "@prisma/generated";

export abstract class IFileRepository {
  abstract findMany(args?: Prisma.FileFindManyArgs): Promise<FileEntity[]>;
  abstract findUnique(
    args: Prisma.FileFindUniqueArgs,
  ): Promise<FileEntity | null>;
  abstract create(args: Prisma.FileCreateArgs): Promise<FileEntity>;
  abstract update(args: Prisma.FileUpdateArgs): Promise<void>;
  abstract softDelete(args: Prisma.FileDeleteArgs): Promise<void>;
  abstract hardDelete(args: Prisma.FileDeleteArgs): Promise<void>;
}
