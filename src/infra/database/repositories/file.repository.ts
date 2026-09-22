import { EntityId } from "@/core/entities/entity-id";
import { PrismaInstance } from "@/core/types/database";
import { IFileRepository } from "@/domain/application/repositories/file.repository";
import { FileEntity } from "@/domain/enterprise/entities/file.entity";
import { StorageKey } from "@/domain/enterprise/value-objects/storage-key.value-object";
import { Prisma } from "@prisma/generated";

export class FileRepository implements IFileRepository {
  constructor(private readonly prisma: PrismaInstance) {}

  async findMany(args?: Prisma.FileFindManyArgs): Promise<FileEntity[]> {
    const argsWrapped = {
      ...args,
      where: { ...args?.where, deletedAt: null },
      include: { object: true },
    } as const;

    const files = await this.prisma.file.findMany(argsWrapped);

    return files.map((file) =>
      FileEntity.create(
        {
          name: file.object.name,
          description: file.object.name,
          storageKey: StorageKey.from(file.object.storageKey),
          objectId: file.object.id,
          createdAt: file.object.createdAt,
          updatedAt: file.object.updatedAt,
        },
        new EntityId(file.id),
      ),
    );
  }

  async findUnique(
    args: Prisma.FileFindUniqueArgs,
  ): Promise<FileEntity | null> {
    const argsWrapped = {
      ...args,
      where: { ...args.where, deletedAt: null },
      include: { object: true },
    } as const;

    const file = await this.prisma.file.findUnique(argsWrapped);

    if (!file) {
      return null;
    }

    return FileEntity.create(
      {
        name: file.object.name,
        description: file.object.name,
        storageKey: StorageKey.from(file.object.storageKey),
        objectId: file.object.id,
        createdAt: file.object.createdAt,
        updatedAt: file.object.updatedAt,
      },
      new EntityId(file.id),
    );
  }

  async create(args: Prisma.FileCreateArgs): Promise<FileEntity> {
    const wrappedArgs = {
      ...args,
      include: { object: true },
    } as const;

    const file = await this.prisma.file.create(wrappedArgs);

    return FileEntity.create(
      {
        name: file.object.name,
        description: file.object.name,
        storageKey: StorageKey.from(file.object.storageKey),
        objectId: file.object.id,
        createdAt: file.object.createdAt,
        updatedAt: file.object.updatedAt,
      },
      new EntityId(file.id),
    );
  }

  async update(args: Prisma.FileUpdateArgs): Promise<void> {
    const wrappedArgs = {
      ...args,
    } as const;

    await this.prisma.file.update(wrappedArgs);
  }

  async softDelete(args: Prisma.FileDeleteArgs): Promise<void> {
    const argsWrapped = {
      ...args,
      where: { ...args.where, deletedAt: null },
    } as const;

    await this.prisma.file.update({
      where: argsWrapped.where,
      data: { deletedAt: new Date() },
    });
  }

  async hardDelete(args: Prisma.FileDeleteArgs): Promise<void> {
    const argsWrapped = {
      ...args,
      where: { ...args.where },
    } as const;

    await this.prisma.file.delete({
      where: argsWrapped.where,
    });
  }
}
