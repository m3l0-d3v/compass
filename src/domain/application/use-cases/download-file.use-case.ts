import { Either } from "@/lib/either";
import {
  IFileStorageRepository,
  StoredFile,
} from "../repositories/file-storage.repository";

type DownloadFileUseCaseResponse = Either<Error, StoredFile>;

export class DownloadFileUseCase {
  constructor(private readonly fileStorageRepository: IFileStorageRepository) {}

  async execute(key: string): Promise<DownloadFileUseCaseResponse> {
    try {
      return Either.right(await this.fileStorageRepository.get(key));
    } catch (error) {
      return Either.left(
        error instanceof Error ? error : new Error("Unable to download file"),
      );
    }
  }
}
