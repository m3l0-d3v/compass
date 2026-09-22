import { DownloadFileUseCase } from "@/domain/application/use-cases/download-file.use-case";
import { S3FileStorageRepository } from "@/infra/aws/repositories/s3-file-storage.repository";
import { NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{ "storage-key": string }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  const { "storage-key": storageKey } = await params;
  const response = await new DownloadFileUseCase(
    new S3FileStorageRepository(),
  ).execute(storageKey);

  if (response.isLeft()) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  const { body, contentDisposition, contentLength, contentType } =
    response.value;
  const headers = new Headers();

  if (contentLength !== undefined) {
    headers.set("Content-Length", contentLength.toString());
  }

  if (contentType) {
    headers.set("Content-Type", contentType);
  }

  if (contentDisposition) {
    headers.set("Content-Disposition", contentDisposition);
  }

  return new Response(body, { headers });
}
