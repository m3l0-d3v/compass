import { EntityId } from "@/core/entities/entity-id";
import { PrismaInstance } from "@/core/types/database";
import { IFolderRepository } from "@/domain/application/repositories/folder.repository";
import { FolderEntity } from "@/domain/enterprise/entities/folder.entity";
import { StorageKey } from "@/domain/enterprise/value-objects/storage-key.value-object";
import { Prisma } from "@prisma/generated";

export class FolderRepository implements IFolderRepository {
  constructor(private readonly prisma: PrismaInstance) {}

  async findMany(args?: Prisma.FolderFindManyArgs): Promise<FolderEntity[]> {
    const argsWrapped = {
      ...args,
      where: { ...args?.where, deletedAt: null },
      include: { object: true },
    } as const;

    const folders = await this.prisma.folder.findMany(argsWrapped);

    return folders.map((folder) =>
      FolderEntity.create(
        {
          name: folder.object.name,
          description: folder.object.name,
          storageKey: StorageKey.from(folder.object.storageKey),
          objectId: folder.object.id,
          createdAt: folder.object.createdAt,
          updatedAt: folder.object.updatedAt,
        },
        new EntityId(folder.id),
      ),
    );
  }

  async findUnique(
    args: Prisma.FolderFindUniqueArgs,
  ): Promise<FolderEntity | null> {
    const argsWrapped = {
      ...args,
      where: { ...args.where, deletedAt: null },
      include: { object: true },
    } as const;

    const folder = await this.prisma.folder.findUnique(argsWrapped);

    if (!folder) {
      return null;
    }

    return FolderEntity.create(
      {
        name: folder.object.name,
        description: folder.object.name,
        storageKey: StorageKey.from(folder.object.storageKey),
        objectId: folder.object.id,
        createdAt: folder.object.createdAt,
        updatedAt: folder.object.updatedAt,
      },
      new EntityId(folder.id),
    );
  }

  async create(args: Prisma.FolderCreateArgs): Promise<FolderEntity> {
    const wrappedArgs = {
      ...args,
      include: { object: true },
    } as const;

    const folder = await this.prisma.folder.create(wrappedArgs);

    return FolderEntity.create(
      {
        name: folder.object.name,
        description: folder.object.name,
        storageKey: StorageKey.from(folder.object.storageKey),
        objectId: folder.object.id,
        createdAt: folder.object.createdAt,
        updatedAt: folder.object.updatedAt,
      },
      new EntityId(folder.id),
    );
  }

  async update(args: Prisma.FolderUpdateArgs): Promise<void> {
    const wrappedArgs = {
      ...args,
    } as const;

    await this.prisma.folder.update(wrappedArgs);
  }

  async softDelete(args: Prisma.FolderDeleteArgs): Promise<void> {
    const argsWrapped = {
      ...args,
      where: { ...args.where, deletedAt: null },
    } as const;

    await this.prisma.folder.update({
      where: argsWrapped.where,
      data: {
        object: {
          update: {
            data: {
              deletedAt: new Date(),
            },
          },
        },
      },
    });
  }

  async hardDelete(args: Prisma.FolderDeleteArgs): Promise<void> {
    const argsWrapped = {
      ...args,
      where: { ...args.where },
    } as const;

    await this.prisma.folder.delete({
      where: argsWrapped.where,
    });
  }
}
