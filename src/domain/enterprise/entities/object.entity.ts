import { Entity, EntityProps } from "@/core/entities/entity";
import { EntityId } from "@/core/entities/entity-id";
import { StorageKey } from "../value-objects/storage-key.value-object";
import { ObjectType } from "@prisma/generated";

type ObjectEntityProps = EntityProps<{
  name: string;
  description: string;
  type: ObjectType;
  storageKey: StorageKey;
  createdAt: Date;
  updatedAt: Date;
}>;

export class ObjectEntity extends Entity<ObjectEntityProps> {
  constructor(props: ObjectEntityProps, id?: EntityId) {
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

  getType() {
    return this.props.type;
  }

  setType(type: ObjectType) {
    this.props.type = type;
  }

  getStorageKey() {
    return this.props.storageKey;
  }

  setStorageKey(storageKey: StorageKey) {
    this.props.storageKey = storageKey;
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

  static create(props: ObjectEntityProps, id?: EntityId) {
    return new ObjectEntity(props, id);
  }
}
