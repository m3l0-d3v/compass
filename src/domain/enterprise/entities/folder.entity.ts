import { Entity, EntityProps } from "@/core/entities/entity";
import { EntityId } from "@/core/entities/entity-id";
import { StorageKey } from "../value-objects/storage-key.value-object";

type FolderEntityProps = EntityProps<{
  name: string;
  description: string;
  storageKey: StorageKey;
  objectId: string;
  createdAt: Date;
  updatedAt: Date;
}>;

export class FolderEntity extends Entity<FolderEntityProps> {
  constructor(props: FolderEntityProps, id?: EntityId) {
    super(props, id);
  }

  getName() {
    return this.props.name;
  }

  setName(name: string) {
    this.props.name = name;
  }

  getDescription() {
    return this.props.description;
  }

  setDescription(description: string) {
    this.props.description = description;
  }

  getObjectId() {
    return this.props.objectId;
  }

  setObjectId(objectId: string) {
    this.props.objectId = objectId;
  }

  getCreatedAt() {
    return this.props.createdAt;
  }

  setCreatedAt(createdAt: Date) {
    this.props.createdAt = createdAt;
  }

  getUpdatedAt() {
    return this.props.updatedAt;
  }

  setUpdatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt;
  }

  static create(props: FolderEntityProps, id?: EntityId) {
    return new FolderEntity(props, id);
  }
}
