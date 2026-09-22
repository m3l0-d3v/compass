"use server";

import { DriveRepository } from "@/infra/database/repositories/drive.repository";
import { Action } from "@/lib/action";
import prisma from "@/lib/prisma";
import { CreateDriveUseCase } from "../use-cases/create-drive.use-case";

type CreateDriveActionRequest = {
  name: string;
  description: string;
};

type CreateDriveActionResponse = void;

export const createDriveAction: Action<
  CreateDriveActionRequest,
  CreateDriveActionResponse
> = async ({ description, name }) => {
  try {
    const driveRepository = new DriveRepository(prisma);

    const createDriveUseCaseResponse = await new CreateDriveUseCase(
      driveRepository,
    ).execute({
      name,
      description,
    });

    if (createDriveUseCaseResponse.isLeft()) {
      return Action.left(new Error("Unable to create drive"));
    }

    return Action.right(void 0);
  } catch (error) {
    return Action.left(new Error("Cannot create drive"));
  }
};
