type Segment = "drives" | "starred" | "trash" | (string & {});

export class Path {
  static create(...paths: Segment[]): string {
    return paths.join("/");
  }
}
