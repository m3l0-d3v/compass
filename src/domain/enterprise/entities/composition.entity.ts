import { Entity } from "@/core/entities/entity";

type CompositionEntityProps = {
  parentId: string;
  childId: string;
};

export class CompositionEntity extends Entity<CompositionEntityProps> {
  constructor(props: CompositionEntityProps) {
    super(props);
  }

  getParentId() {
    return this.props.parentId;
  }

  setParentId(parentId: string) {
    this.props.parentId = parentId;
  }

  getChildId() {
    return this.props.childId;
  }

  setChildId(childId: string) {
    this.props.childId = childId;
  }

  static create(props: CompositionEntityProps) {
    return new CompositionEntity(props);
  }
}
