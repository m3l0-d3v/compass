import { Entity, EntityProps } from "@/core/entities/entity";
import { EntityId } from "@/core/entities/entity-id";
import { StorageKey } from "../value-objects/storage-key.value-object";

type DriveEntityProps = EntityProps<{
  name: string;
  description: string;
  storageKey: StorageKey;
  objectId: string;
  createdAt: Date;
  updatedAt: Date;
}>;

export class DriveEntity extends Entity<DriveEntityProps> {
  constructor(props: DriveEntityProps, id?: EntityId) {
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

  static create(props: DriveEntityProps, id?: EntityId) {
    return new DriveEntity(props, id);
  }
}
