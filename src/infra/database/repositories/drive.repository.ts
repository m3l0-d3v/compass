import { EntityId } from "@/core/entities/entity-id";
import { PrismaInstance } from "@/core/types/database";
import { IDriveRepository } from "@/domain/application/repositories/drive.repository";
import { DriveEntity } from "@/domain/enterprise/entities/drive.entity";
import { StorageKey } from "@/domain/enterprise/value-objects/storage-key.value-object";
import { Prisma } from "@prisma/generated";

export class DriveRepository implements IDriveRepository {
  constructor(private readonly prisma: PrismaInstance) {}

  async findMany(args?: Prisma.DriveFindManyArgs): Promise<DriveEntity[]> {
    const argsWrapped = {
      ...args,
      where: { ...args?.where, deletedAt: null },
      include: { object: true },
    } as const;

    const drives = await this.prisma.drive.findMany(argsWrapped);

    return drives.map((drive) =>
      DriveEntity.create(
        {
          name: drive.object.name,
          description: drive.object.name,
          storageKey: StorageKey.from(drive.object.storageKey),
          objectId: drive.object.id,
          createdAt: drive.object.createdAt,
          updatedAt: drive.object.updatedAt,
        },
        new EntityId(drive.id),
      ),
    );
  }

  async findUnique(
    args: Prisma.DriveFindUniqueArgs,
  ): Promise<DriveEntity | null> {
    const argsWrapped = {
      ...args,
      where: { ...args.where, deletedAt: null },
      include: { object: true },
    } as const;

    const drive = await this.prisma.drive.findUnique(argsWrapped);

    if (!drive) {
      return null;
    }

    return DriveEntity.create(
      {
        name: drive.object.name,
        description: drive.object.name,
        storageKey: StorageKey.from(drive.object.storageKey),
        objectId: drive.object.id,
        createdAt: drive.object.createdAt,
        updatedAt: drive.object.updatedAt,
      },
      new EntityId(drive.id),
    );
  }

  async create(args: Prisma.DriveCreateArgs): Promise<void> {
    const wrappedArgs = {
      ...args,
    } as const;

    await this.prisma.drive.create(wrappedArgs);
  }

  async update(args: Prisma.DriveUpdateArgs): Promise<void> {
    const wrappedArgs = {
      ...args,
    } as const;

    await this.prisma.drive.update(wrappedArgs);
  }

  async softDelete(args: Prisma.DriveDeleteArgs): Promise<void> {
    const argsWrapped = {
      ...args,
      where: { ...args.where, deletedAt: null },
    } as const;

    await this.prisma.drive.update({
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

  async hardDelete(args: Prisma.DriveDeleteArgs): Promise<void> {
    const argsWrapped = {
      ...args,
      where: { ...args.where },
    } as const;

    await this.prisma.drive.delete({
      where: argsWrapped.where,
    });
  }
}
