import { StorageKey } from "@/domain/enterprise/value-objects/storage-key.value-object";
import { Either } from "@/lib/either";
import { ObjectType } from "@prisma/generated";
import { ICompositionRepository } from "../repositories/composition.repository";
import { IFileStorageRepository } from "../repositories/file-storage.repository";
import { IFileRepository } from "../repositories/file.repository";
import { IObjectRepository } from "../repositories/object.repository";

type CreateFileUseCaseRequest = {
  name: string;
  description: string;
  mimeType: string;
  extension: string;
  size: number;
  body: Uint8Array;
  parentId?: string;
};

type CreateFileUseCaseResponse = Either<Error, { storageKey: string }>;

export class CreateFileUseCase {
  constructor(
    private readonly objectRepository: IObjectRepository,
    private readonly fileRepository: IFileRepository,
    private readonly compositionRepository: ICompositionRepository,
    private readonly fileStorageRepository: IFileStorageRepository,
  ) {}

  async execute({
    description,
    extension,
    mimeType,
    name,
    parentId,
    size,
    body,
  }: CreateFileUseCaseRequest): Promise<CreateFileUseCaseResponse> {
    try {
      if (parentId) {
        const parent = await this.objectRepository.findUnique({
          where: { id: parentId },
        });

        if (!parent) {
          return Either.left(new Error("Parent object does not exist"));
        }
      }

      const storageKey = StorageKey.create().toString();

      await this.fileStorageRepository.put(
        storageKey,
        body,
        mimeType,
        `attachment; filename="${name.replace(/["\\\r\n]/g, "_")}"`,
      );

      const file = await this.fileRepository.create({
        data: {
          mimeType,
          extension,
          size,
          object: {
            create: {
              name,
              description,
              storageKey,
              type: ObjectType.File,
            },
          },
        },
      });

      if (parentId) {
        await this.compositionRepository.create({
          data: {
            parentId,
            childId: file.getObjectId(),
          },
        });
      }

      return Either.right({ storageKey });
    } catch (error) {
      console.error(error);
      return Either.left(new Error("Unable to create file"));
    }
  }
}
