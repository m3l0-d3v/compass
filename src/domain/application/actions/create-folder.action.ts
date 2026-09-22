"use server";

import { Action } from "@/lib/action";
import prisma from "@/lib/prisma";
import { CreateFolderUseCase } from "../use-cases/create-folder.use-case";
import { ObjectRepository } from "@/infra/database/repositories/object.repository";
import { FolderRepository } from "@/infra/database/repositories/folder.repository";
import { CompositionRepository } from "@/infra/database/repositories/composition.repository";

type CreateFolderActionRequest = {
  name: string;
  description: string;
  parentId?: string;
};

type CreateFolderActionResponse = void;

export const createFolderAction: Action<
  CreateFolderActionRequest,
  CreateFolderActionResponse
> = async ({ description, name, parentId }) => {
  try {
    return await prisma.$transaction(async (tx) => {
      const objectRepository = new ObjectRepository(tx);
      const folderRepository = new FolderRepository(tx);
      const compositionRepository = new CompositionRepository(tx);

      const createFolderUseCaseResponse = await new CreateFolderUseCase(
        objectRepository,
        folderRepository,
        compositionRepository,
      ).execute({
        name,
        description,
        parentId,
      });

      if (createFolderUseCaseResponse.isLeft()) {
        throw new Error("Unable to create folder");
      }

      return Action.right(void 0);
    });
  } catch (error) {
    return Action.left(new Error("Cannot create folder"));
  }
};
