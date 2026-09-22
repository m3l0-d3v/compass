import { ObjectEntity } from "@/domain/enterprise/entities/object.entity";
import { Either } from "@/lib/either";
import { ObjectType } from "@prisma/generated";
import { IObjectRepository } from "../repositories/object.repository";

type GetObjectsUseCaseRequest = {
  parentId?: string;
  types?: ObjectType[];
};

type GetObjectsUseCaseResponse = Either<
  Error,
  {
    objects: ObjectEntity[];
  }
>;

const defaultTypes = [ObjectType.Folder, ObjectType.File];

export class GetObjectsUseCase {
  constructor(private readonly objectRepository: IObjectRepository) {}

  async execute({
    parentId,
    types = defaultTypes,
  }: GetObjectsUseCaseRequest): Promise<GetObjectsUseCaseResponse> {
    try {
      const objects = await this.objectRepository.findMany({
        where: {
          type: {
            in: types,
          },
          ...(parentId && {
            childCompositions: {
              some: {
                parentId,
              },
            },
          }),
        },
      });

      return Either.right({ objects });
    } catch (error) {
      console.error(error);
      return Either.left(new Error("Unable to get objects with types"));
    }
  }
}
