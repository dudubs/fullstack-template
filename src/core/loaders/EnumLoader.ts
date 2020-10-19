import { pipe } from "rxjs";
import { Payload } from "../Result";
import { checkLoader } from "./operators/checkLoader";
import { Loader } from "./Loader";
import { loadToValue } from "./operators/loadToValue";
import { checkType, TypeNameError } from "./TypeLoader";

export type EnumLoader<T extends Record<string, any>> = Loader<
  T[string],
  keyof T,
  | TypeNameError<"string">
  | Payload<{
      INVALID_KEY: { key: string };
    }>
>;

export function EnumLoader<T extends Record<string, any>>(
  keyToValue: T
): EnumLoader<T> {
  return pipe(
    checkType("string"),
    checkLoader((key) => {
      if (!(key in keyToValue)) {
        return { type: "INVALID_KEY", key } as const;
      }
    }),
    loadToValue((key) => keyToValue[key] as T[string])
  );
}
