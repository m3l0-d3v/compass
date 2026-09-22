import { CompositionEntity } from "@/domain/enterprise/entities/composition.entity";
import { Prisma } from "@prisma/generated";

export abstract class ICompositionRepository {
  abstract findMany(
    args?: Prisma.CompositionFindManyArgs,
  ): Promise<CompositionEntity[]>;
  abstract findUnique(
    args: Prisma.CompositionFindUniqueArgs,
  ): Promise<CompositionEntity | null>;
  abstract create(args: Prisma.CompositionCreateArgs): Promise<void>;
  abstract update(args: Prisma.CompositionUpdateArgs): Promise<void>;
  abstract softDelete(args: Prisma.CompositionDeleteArgs): Promise<void>;
  abstract hardDelete(args: Prisma.CompositionDeleteArgs): Promise<void>;
}
