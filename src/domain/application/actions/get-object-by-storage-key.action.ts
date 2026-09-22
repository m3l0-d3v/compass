"use server";

import { ObjectRepository } from "@/infra/database/repositories/object.repository";
import { Action } from "@/lib/action";
import prisma from "@/lib/prisma";
import { GetObjectByStorageKeyUseCase } from "../use-cases/get-object-by-storage-key.use-case";
import {
  ObjectHTTP,
  ObjectPresenter,
} from "@/infra/http/presenters/object.presenter";

type GetObjectByStorageKeyActionRequest = {
  storageKey: string;
};

type GetObjectByStorageKeyActionResponse = {
  object: ObjectHTTP | null;
};

export const getObjectByStorageKeyAction: Action<
  GetObjectByStorageKeyActionRequest,
  GetObjectByStorageKeyActionResponse
> = async ({ storageKey }) => {
  try {
    const objectRepository = new ObjectRepository(prisma);

    const getObjectByStorageKeyUseCaseResponse =
      await new GetObjectByStorageKeyUseCase(objectRepository).execute({
        storageKey,
      });

    if (getObjectByStorageKeyUseCaseResponse.isLeft()) {
      return Action.left(new Error("Unable to get objects with types"));
    }

    const { object } = getObjectByStorageKeyUseCaseResponse.value;

    if (!object) {
      return Action.right({
        object: null,
      });
    }

    return Action.right({ object: ObjectPresenter.toHTTP(object) });
  } catch (error) {
    return Action.left(new Error("Unable to get objects with types"));
  }
};
