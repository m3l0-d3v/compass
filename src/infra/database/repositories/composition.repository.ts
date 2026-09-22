import { EntityId } from "@/core/entities/entity-id";
import { PrismaInstance } from "@/core/types/database";
import { ICompositionRepository } from "@/domain/application/repositories/composition.repository";
import { CompositionEntity } from "@/domain/enterprise/entities/composition.entity";
import { Prisma } from "@prisma/generated";

export class CompositionRepository implements ICompositionRepository {
  constructor(private readonly prisma: PrismaInstance) {}

  async findMany(
    args?: Prisma.CompositionFindManyArgs,
  ): Promise<CompositionEntity[]> {
    const argsWrapped = {
      ...args,
      where: { ...args?.where, deletedAt: null },
    } as const;

    const compositions = await this.prisma.composition.findMany(argsWrapped);

    return compositions.map((composition) =>
      CompositionEntity.create({
        childId: composition.childId,
        parentId: composition.parentId,
      }),
    );
  }

  async findUnique(
    args: Prisma.CompositionFindUniqueArgs,
  ): Promise<CompositionEntity | null> {
    const argsWrapped = {
      ...args,
      where: { ...args.where, deletedAt: null },
    } as const;

    const composition = await this.prisma.composition.findUnique(argsWrapped);

    if (!composition) {
      return null;
    }

    return CompositionEntity.create({
      childId: composition.childId,
      parentId: composition.parentId,
    });
  }

  async create(args: Prisma.CompositionCreateArgs): Promise<void> {
    const wrappedArgs = {
      ...args,
    } as const;

    await this.prisma.composition.create(wrappedArgs);
  }

  async update(args: Prisma.CompositionUpdateArgs): Promise<void> {
    const wrappedArgs = {
      ...args,
    } as const;

    await this.prisma.composition.update(wrappedArgs);
  }

  async softDelete(args: Prisma.CompositionDeleteArgs): Promise<void> {
    const argsWrapped = {
      ...args,
      where: { ...args.where, deletedAt: null },
    } as const;

    await this.prisma.composition.update({
      where: argsWrapped.where,
      data: { deletedAt: new Date() },
    });
  }

  async hardDelete(args: Prisma.CompositionDeleteArgs): Promise<void> {
    const argsWrapped = {
      ...args,
      where: { ...args.where },
    } as const;

    await this.prisma.composition.delete({
      where: argsWrapped.where,
    });
  }
}
