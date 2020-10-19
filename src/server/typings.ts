export type Awaitable<T = void> = T | Promise<T>;
export type Awaited<T extends Awaitable<any>> = T extends Awaitable<infer U>
  ? U
  : never;

export type Union<T> = T[keyof T];

export type PartialKeys<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

export type PartialUndefinedKeys<T> = PartialKeys<
  T,
  Union<
    {
      [K in keyof T]: undefined extends T[K] ? K : never;
    }
  >
>;
