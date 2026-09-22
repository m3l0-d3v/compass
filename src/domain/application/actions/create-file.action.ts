"use server";

import { Action } from "@/lib/action";
import prisma from "@/lib/prisma";
import { ObjectRepository } from "@/infra/database/repositories/object.repository";
import { FileRepository } from "@/infra/database/repositories/file.repository";
import { CompositionRepository } from "@/infra/database/repositories/composition.repository";
import { CreateFileUseCase } from "../use-cases/create-file.use-case";

type CreateFileActionRequest = {
  name: string;
  description: string;
  mimeType: string;
  extension: string;
  size: number;
  parentId?: string;
};

type CreateFileActionResponse = void;

export const createFileAction: Action<
  CreateFileActionRequest,
  CreateFileActionResponse
> = async ({ description, extension, mimeType, name, parentId, size }) => {
  try {
    return await prisma.$transaction(async (tx) => {
      const objectRepository = new ObjectRepository(tx);
      const fileRepository = new FileRepository(tx);
      const compositionRepository = new CompositionRepository(tx);

      const createFileUseCaseResponse = await new CreateFileUseCase(
        objectRepository,
        fileRepository,
        compositionRepository,
      ).execute({
        name,
        description,
        mimeType,
        extension,
        size,
        parentId,
      });

      if (createFileUseCaseResponse.isLeft()) {
        throw createFileUseCaseResponse.value;
      }

      return Action.right(void 0);
    });
  } catch (error) {
    return Action.left(new Error("Cannot create file"));
  }
};
