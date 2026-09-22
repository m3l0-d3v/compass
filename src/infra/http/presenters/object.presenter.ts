import { ObjectEntity } from "@/domain/enterprise/entities/object.entity";
import { ObjectType } from "@prisma/generated";

export type ObjectHTTP = {
  id: string;
  name: string;
  description: string;
  type: ObjectType;
  storageKey: string;
  createdAt: Date;
  updatedAt: Date;
};

export class ObjectPresenter {
  static toHTTP(folder: ObjectEntity) {
    return {
      id: folder.getId().toString(),
      name: folder.getName(),
      description: folder.getDescription(),
      type: folder.getType(),
      storageKey: folder.getStorageKey().toString(),
      createdAt: folder.getCreatedAt(),
      updatedAt: folder.getUpdatedAt(),
    };
  }
}
