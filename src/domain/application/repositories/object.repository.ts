import { ObjectEntity } from "@/domain/enterprise/entities/object.entity";
import { Prisma } from "@prisma/generated";

export abstract class IObjectRepository {
  abstract findMany(args?: Prisma.ObjectFindManyArgs): Promise<ObjectEntity[]>;
  abstract findUnique(
    args: Prisma.ObjectFindUniqueArgs,
  ): Promise<ObjectEntity | null>;
  abstract create(args: Prisma.ObjectCreateArgs): Promise<void>;
  abstract update(args: Prisma.ObjectUpdateArgs): Promise<void>;
  abstract softDelete(args: Prisma.ObjectDeleteArgs): Promise<void>;
  abstract hardDelete(args: Prisma.ObjectDeleteArgs): Promise<void>;
}
