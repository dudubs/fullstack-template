import { pipe } from "rxjs";
import { PartialUndefinedKeys } from "../../server/typings";
import { entries } from "../object/entries";
import { Payload } from "../Result";
import { keyToErrorCheck } from "./operators/keyToErrorCheck";
import {
  AnyLoader,
  Loader,
  LoaderData,
  LoaderError,
  LoaderValue,
} from "./Loader";
import { loadToPromise } from "./operators/loadToPromise";
import { loadToKey, loadToValue } from "./operators/loadToValue";

import { checkType, TypeNameError } from "./TypeLoader";

export type ObjectLoader<T extends Record<string, AnyLoader>> = Loader<
  {
    [K in keyof T]: LoaderValue<T[K]>;
  },
  PartialUndefinedKeys<
    {
      [K in keyof T]: LoaderData<T[K]>;
    }
  >,
  | TypeNameError<"object">
  | Payload<{
      OBJECT: { keyToError: { [K in keyof T]?: LoaderError<T[K]> } };
    }>
>;

export function ObjectLoader<T extends Record<string, AnyLoader>>(
  keyToLoader: T
): ObjectLoader<T> {
  //
  return pipe(
    checkType("object"),
    loadToValue(async (keyToData) => {
      const keyToError: { [K in keyof T]?: LoaderError<T[K]> } = {};
      const keyToValue: LoaderValue<ObjectLoader<T>> = <any>{};
      for (let [key, loader] of entries(keyToLoader)) {
        const result = await loadToPromise(loader, keyToData[key]);
        if ("error" in result) {
          keyToError[key as keyof T] = result.error;
          continue;
        }
        keyToValue[key as keyof T] = result.value;
      }
      return { keyToValue, keyToError };
    }),
    keyToErrorCheck("OBJECT"),
    loadToKey("keyToValue")
  );
}
