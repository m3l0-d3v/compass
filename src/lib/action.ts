export type ActionError = Error;

export type ActionPayload<T> = T;

export type ActionResponseRight<T> = {
  isRight: true;
  isLeft: false;
  value: T;
  metadata?: Record<string, any>;
};

export type ActionResponseLeft<E extends ActionError> = {
  isRight: false;
  isLeft: true;
  error: E;
  metadata?: Record<string, any>;
};

export type ActionResponse<T, E extends ActionError = ActionError> =
  | ActionResponseRight<T>
  | ActionResponseLeft<E>;

export type Action<P = unknown, R = unknown> = (
  payload: ActionPayload<P>
) => Promise<ActionResponse<R>>;

export const right = <T>(
  data: T,
  metadata?: Record<string, any>
): ActionResponse<T> => ({
  isRight: true,
  isLeft: false,
  value: data,
  metadata,
});

export const left = <E extends ActionError>(
  error: E
): ActionResponse<never, E> => {
  const { name, message, statusCode, ...rest } = error as any;

  return {
    isRight: false,
    isLeft: true,
    error: new Error(message) as E,
    metadata: rest.metadata,
  };
};

class ActionStatic {
  static right = right;
  static left = left;
}

export const Action = ActionStatic;
