export type StoredFile = {
  body: ReadableStream<Uint8Array>;
  contentLength?: number;
  contentType?: string;
  contentDisposition?: string;
};

export abstract class IFileStorageRepository {
  abstract get(key: string): Promise<StoredFile>;
  abstract put(
    key: string,
    body: Uint8Array,
    contentType: string,
    contentDisposition?: string,
  ): Promise<void>;
}
