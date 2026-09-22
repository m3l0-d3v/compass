import { Either } from "@/lib/either";
import { IDriveRepository } from "../repositories/drive.repository";
import { StorageKey } from "@/domain/enterprise/value-objects/storage-key.value-object";

type CreateDriveUseCaseRequest = {
  name: string;
  description: string;
};

type CreateDriveUseCaseResponse = Either<Error, void>;

export class CreateDriveUseCase {
  constructor(private readonly driveRepository: IDriveRepository) {}

  async execute({
    description,
    name,
  }: CreateDriveUseCaseRequest): Promise<CreateDriveUseCaseResponse> {
    try {
      await this.driveRepository.create({
        data: {
          object: {
            create: {
              name,
              description,
              storageKey: StorageKey.create().toString(),
            },
          },
        },
      });

      return Either.right(void 0);
    } catch (error) {
      console.error(error);
      return Either.left(new Error("Unable to create drive because"));
    }
  }
}
