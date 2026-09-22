import { FolderEntity } from "@/domain/enterprise/entities/folder.entity";

export type FolderHTTP = {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

export class FolderPresenter {
  static toHTTP(folder: FolderEntity) {
    return {
      id: folder.getId().toString(),
      name: folder.getName(),
      description: folder.getDescription(),
      createdAt: folder.getCreatedAt(),
      updatedAt: folder.getUpdatedAt(),
    };
  }
}
