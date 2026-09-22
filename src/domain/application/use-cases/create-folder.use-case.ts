import { Either } from "@/lib/either";
import { IFolderRepository } from "../repositories/folder.repository";
import { StorageKey } from "@/domain/enterprise/value-objects/storage-key.value-object";
import { IObjectRepository } from "../repositories/object.repository";
import { ICompositionRepository } from "../repositories/composition.repository";
import { ObjectType } from "@prisma/generated";

type CreateFolderUseCaseRequest = {
  name: string;
  description: string;
  parentId?: string;
};

type CreateFolderUseCaseResponse = Either<Error, void>;

export class CreateFolderUseCase {
  constructor(
    private readonly objectRepository: IObjectRepository,
    private readonly folderRepository: IFolderRepository,
    private readonly compositionRepository: ICompositionRepository,
  ) {}

  async execute({
    description,
    name,
    parentId,
  }: CreateFolderUseCaseRequest): Promise<CreateFolderUseCaseResponse> {
    try {
      const folder = await this.folderRepository.create({
        data: {
          object: {
            create: {
              name,
              description,
              storageKey: StorageKey.create().toString(),
              type: ObjectType.Folder,
            },
          },
        },
      });

      if (parentId) {
        const object = await this.objectRepository.findUnique({
          where: {
            id: parentId,
          },
        });

        if (!object) {
          return Either.left(new Error("Parent object does not exists"));
        }

        await this.compositionRepository.create({
          data: {
            parentId,
            childId: folder.getObjectId(),
          },
        });
      }

      return Either.right(void 0);
    } catch (error) {
      console.error(error);
      return Either.left(new Error("Unable to create folder because"));
    }
  }
}
