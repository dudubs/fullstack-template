import { pipe } from "rxjs";
import { mapArrayToObject } from "../object/mapArrayToObject";
import { Payload } from "../Result";
import { checkLoader } from "./operators/checkLoader";
import { Loader, LoaderError } from "./Loader";
import { loadToValue } from "./operators/loadToValue";
import { checkType, TypeLoader } from "./TypeLoader";

export type KeyLoader<K extends string> = Loader<
  K,
  K,
  | LoaderError<TypeLoader<"string">>
  | Payload<{
      INVALID_KEY: { expectedKeys: K[]; gotKey: string };
    }>
>;

export function KeyLoader<K extends string>(
  obj: Record<K, any> | K[]
): KeyLoader<K> {
  if (Array.isArray(obj)) {
    obj = mapArrayToObject(obj, (key) => [key, true]);
  }
  return pipe(
    checkType("string"),
    checkLoader((key) => {
      if (!obj.hasOwnProperty(key)) {
        return {
          type: "INVALID_KEY",
          expectedKeys: Object.keys(obj) as K[],
          gotKey: key as string,
        } as const;
      }
    }),
    loadToValue((key) => key as K)
  );
}
