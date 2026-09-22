import { DriveEntity } from "@/domain/enterprise/entities/drive.entity";
import { Prisma } from "@prisma/generated";

export abstract class IDriveRepository {
  abstract findMany(args?: Prisma.DriveFindManyArgs): Promise<DriveEntity[]>;
  abstract findUnique(
    args: Prisma.DriveFindUniqueArgs,
  ): Promise<DriveEntity | null>;
  abstract create(args: Prisma.DriveCreateArgs): Promise<void>;
  abstract update(args: Prisma.DriveUpdateArgs): Promise<void>;
  abstract softDelete(args: Prisma.DriveDeleteArgs): Promise<void>;
  abstract hardDelete(args: Prisma.DriveDeleteArgs): Promise<void>;
}
