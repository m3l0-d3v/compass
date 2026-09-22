export class Fail<L, R> {
  readonly value: L;

  constructor(value: L) {
    this.value = value;
  }

  isRight(): this is Succeed<L, R> {
    return false;
  }

  isLeft(): this is Fail<L, R> {
    return true;
  }
}

export class Succeed<L, R> {
  readonly value: R;

  constructor(value: R) {
    this.value = value;
  }

  isRight(): this is Succeed<L, R> {
    return true;
  }

  isLeft(): this is Fail<L, R> {
    return false;
  }
}

export const fail = <L, R>(value: L): Either<L, R> => {
  return new Fail(value);
};

export const succeed = <L, R>(value: R): Either<L, R> => {
  return new Succeed(value);
};

export type Either<L, R> = Fail<L, R> | Succeed<L, R>;

class EitherStatic {
  static left = fail;
  static right = succeed;
}

export const Either = EitherStatic;
