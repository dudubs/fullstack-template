import { pipe } from "rxjs";
import { hasKeys } from "../object/hasKeys";
import { Payload } from "../Result";
import { checkLoader } from "./operators/checkLoader";
import { checkLength, LengthError } from "./LengthLoader";
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

export type ArrayLoaderTypes<T extends AnyLoader> = {
  ItemError: Payload<{
    TARGET: { targetError: LoaderError<T> };
    UNIQUE_KEY: { key: string | number };
  }>;

  Error:
    | LengthError
    | TypeNameError<"array">
    | Payload<{
        ITEMS: { indexToError: ArrayLoaderTypes<T>["IndexToError"] };
      }>;

  IndexToError: Record<number, ArrayLoaderTypes<T>["ItemError"]>;

  Data: LoaderData<T>[];

  Value: LoaderValue<T>[];

  Loader: Loader<
    ArrayLoaderTypes<T>["Value"],
    ArrayLoaderTypes<T>["Data"],
    ArrayLoaderTypes<T>["Error"]
  >;
};

export type ArrayLoaderOptions<T extends AnyLoader> = {
  getKey?: (value: LoaderValue<T>) => string | number;
  maxLength?: number;
  minLength?: number;
  ignoreUniqueKey?: boolean;
};

export type ArrayLoader<T extends AnyLoader> = ArrayLoaderTypes<T>["Loader"];

export function ArrayLoader<T extends AnyLoader>(
  itemLoader: T,
  { maxLength, minLength, getKey, ignoreUniqueKey }: ArrayLoaderOptions<T> = {}
): ArrayLoader<T> {
  return pipe(
    checkType("array"),
    checkLength({ minLength, maxLength }),
    loadToValue(async (data) => {
      const values: LoaderValue<T>[] = [];
      const indexToError: ArrayLoaderTypes<T>["IndexToError"] = {};
      const keys = new Set();
      for (const [index, itemData] of data.entries()) {
        const item = await loadToPromise(itemLoader, itemData);
        if ("error" in item) {
          indexToError[index] = { type: "TARGET", targetError: item.error };
          continue;
        }
        if (getKey) {
          const key = getKey(item.value);
          if (keys.has(key)) {
            if (!ignoreUniqueKey)
              indexToError[index] = { type: "UNIQUE_KEY", key };
            continue;
          }
          keys.add(key);
        }
        values.push(item.value);
      }
      return { values, indexToError };
    }),
    checkLoader(({ indexToError }) => {
      if (hasKeys(indexToError))
        return { type: "ITEMS", indexToError } as const;
    }),
    loadToKey("values")
  );
}
