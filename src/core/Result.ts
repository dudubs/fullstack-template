import { Union } from "../server/typings";

export const FAILED = { type: "failed" } as const;
export const SUCCESS = { type: "success" } as const;

export type SucessOrFailed = typeof SUCCESS | typeof FAILED;
export type Payload<T extends Record<string, object>> = Union<
  {
    [K in keyof T]: {
      readonly type: K;
    } & Readonly<T[K]>;
  }
>;
