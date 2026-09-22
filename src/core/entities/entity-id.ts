import { v7 as uuidv7 } from "uuid";

export class EntityId {
  private value: string;

  toString() {
    return this.value;
  }

  constructor(value?: string) {
    if (value) {
      this.value = value;
    } else {
      this.value = uuidv7();
    }
  }

  equals(id: EntityId) {
    return id.toString() === this.value;
  }
}
