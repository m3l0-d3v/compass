"use server";

import { ObjectRepository } from "@/infra/database/repositories/object.repository";
import { Action } from "@/lib/action";
import prisma from "@/lib/prisma";
import { GetObjectsUseCase } from "../use-cases/get-objects.use-case";
import { ObjectType } from "@prisma/generated";
import {
  ObjectHTTP,
  ObjectPresenter,
} from "@/infra/http/presenters/object.presenter";

type GetObjectsActionRequest = {
  parentId?: string;
  types?: ObjectType[];
};

type GetObjectsActionResponse = {
  objects: ObjectHTTP[];
};

export const getObjectsAction: Action<
  GetObjectsActionRequest,
  GetObjectsActionResponse
> = async ({ types, parentId }) => {
  try {
    const objectRepository = new ObjectRepository(prisma);

    const getObjectsUseCaseResponse = await new GetObjectsUseCase(
      objectRepository,
    ).execute({
      types,
      parentId,
    });

    if (getObjectsUseCaseResponse.isLeft()) {
      return Action.left(new Error("Unable to get objects with types"));
    }

    const { objects } = getObjectsUseCaseResponse.value;

    return Action.right({ objects: objects.map(ObjectPresenter.toHTTP) });
  } catch (error) {
    return Action.left(new Error("Unable to get objects with types"));
  }
};
