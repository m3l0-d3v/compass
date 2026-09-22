import crypto from "node:crypto";

const STORAGE_KEY_LENGTH = 32;

export class StorageKey {
  private constructor(private readonly value: string) {}

  public static create(): StorageKey {
    return new StorageKey(crypto.randomBytes(24).toString("base64url"));
  }

  public static from(value: string): StorageKey {
    if (!StorageKey.isValid(value)) {
      throw new Error("Storage key inválida.");
    }

    return new StorageKey(value);
  }

  private static isValid(value: string): boolean {
    return (
      value.length === STORAGE_KEY_LENGTH && /^[A-Za-z0-9_-]+$/.test(value)
    );
  }

  public toString(): string {
    return this.value;
  }

  public equals(other: StorageKey): boolean {
    return this.value === other.value;
  }
}
