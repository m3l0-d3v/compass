import {
  IFileStorageRepository,
  StoredFile,
} from "@/domain/application/repositories/file-storage.repository";
import { getS3Object, putS3Object } from "../services/s3.service";

export class S3FileStorageRepository implements IFileStorageRepository {
  async get(key: string): Promise<StoredFile> {
    const object = await getS3Object(key);

    if (!object.Body) {
      throw new Error("S3 object has no body");
    }

    return {
      body: object.Body.transformToWebStream() as ReadableStream<Uint8Array>,
      contentLength: object.ContentLength,
      contentType: object.ContentType,
      contentDisposition: object.ContentDisposition,
    };
  }

  async put(
    key: string,
    body: Uint8Array,
    contentType: string,
    contentDisposition?: string,
  ): Promise<void> {
    await putS3Object(key, body, contentType, contentDisposition);
  }
}
