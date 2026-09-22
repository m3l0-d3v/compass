import { EntityId } from "./entity-id";

export type EntityProps<T> = T & {
  id?: EntityId;
};

export abstract class Entity<Props> {
  private id: EntityId;
  protected props: Props;

  getId() {
    return this.id;
  }

  setId(id: EntityId): void {
    this.id = id;
  }

  protected constructor(props: Props, id?: EntityId) {
    this.props = props;
    this.id = id ?? new EntityId();
  }

  public equals(entity: Entity<unknown>) {
    if (entity === this) {
      return true;
    }

    if (entity.getId() === this.id) {
      return true;
    }

    return false;
  }
}
