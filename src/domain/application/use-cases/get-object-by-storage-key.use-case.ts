import { ObjectEntity } from "@/domain/enterprise/entities/object.entity";
import { Either } from "@/lib/either";
import { ObjectType } from "@prisma/generated";
import { IObjectRepository } from "../repositories/object.repository";

type GetObjectByStorageKeyUseCaseRequest = {
  storageKey: string;
};

type GetObjectByStorageKeyUseCaseResponse = Either<
  Error,
  {
    object: ObjectEntity | null;
  }
>;

export class GetObjectByStorageKeyUseCase {
  constructor(private readonly objectRepository: IObjectRepository) {}

  async execute({
    storageKey,
  }: GetObjectByStorageKeyUseCaseRequest): Promise<GetObjectByStorageKeyUseCaseResponse> {
    try {
      const object = await this.objectRepository.findUnique({
        where: {
          storageKey,
        },
      });

      return Either.right({ object });
    } catch (error) {
      console.error(error);
      return Either.left(new Error("Unable to get object with types"));
    }
  }
}
