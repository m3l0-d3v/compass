import { EntityId } from "@/core/entities/entity-id";
import { PrismaInstance } from "@/core/types/database";
import { IObjectRepository } from "@/domain/application/repositories/object.repository";
import { ObjectEntity } from "@/domain/enterprise/entities/object.entity";
import { StorageKey } from "@/domain/enterprise/value-objects/storage-key.value-object";
import { Prisma } from "@prisma/generated";

export class ObjectRepository implements IObjectRepository {
  constructor(private readonly prisma: PrismaInstance) {}

  async findMany(args?: Prisma.ObjectFindManyArgs): Promise<ObjectEntity[]> {
    const argsWrapped = {
      ...args,
      where: { ...args?.where, deletedAt: null },
    } as const;

    const objects = await this.prisma.object.findMany(argsWrapped);

    return objects.map((object) =>
      ObjectEntity.create(
        {
          name: object.name,
          description: object.name,
          type: object.type,
          storageKey: StorageKey.from(object.storageKey),
          createdAt: object.createdAt,
          updatedAt: object.updatedAt,
        },
        new EntityId(object.id),
      ),
    );
  }

  async findUnique(
    args: Prisma.ObjectFindUniqueArgs,
  ): Promise<ObjectEntity | null> {
    const argsWrapped = {
      ...args,
      where: { ...args.where, deletedAt: null },
    } as const;

    const object = await this.prisma.object.findUnique(argsWrapped);

    if (!object) {
      return null;
    }

    return ObjectEntity.create(
      {
        name: object.name,
        description: object.name,
        type: object.type,
        storageKey: StorageKey.from(object.storageKey),
        createdAt: object.createdAt,
        updatedAt: object.updatedAt,
      },
      new EntityId(object.id),
    );
  }

  async create(args: Prisma.ObjectCreateArgs): Promise<void> {
    const wrappedArgs = {
      ...args,
    } as const;

    await this.prisma.object.create(wrappedArgs);
  }

  async update(args: Prisma.ObjectUpdateArgs): Promise<void> {
    const wrappedArgs = {
      ...args,
    } as const;

    await this.prisma.object.update(wrappedArgs);
  }

  async softDelete(args: Prisma.ObjectDeleteArgs): Promise<void> {
    const argsWrapped = {
      ...args,
      where: { ...args.where, deletedAt: null },
    } as const;

    await this.prisma.object.update({
      where: argsWrapped.where,
      data: { deletedAt: new Date() },
    });
  }

  async hardDelete(args: Prisma.ObjectDeleteArgs): Promise<void> {
    const argsWrapped = {
      ...args,
      where: { ...args.where },
    } as const;

    await this.prisma.object.delete({
      where: argsWrapped.where,
    });
  }
}
