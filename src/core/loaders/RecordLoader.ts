import { pipe } from "rxjs";
import { entries } from "../object/entries";
import { Payload } from "../Result";
import { keyToErrorCheck } from "./operators/keyToErrorCheck";
import { AnyLoader, Loader, LoaderData, LoaderValue } from "./Loader";
import { loadToPromise } from "./operators/loadToPromise";
import { loadToKey, loadToValue } from "./operators/loadToValue";

import { checkType, TypeNameError } from "./TypeLoader";

export type RecordLoader<
  KeyLoader extends Loader<string, any, any>,
  ValueLoader extends AnyLoader
> = Loader<
  Partial<Record<LoaderValue<KeyLoader>, LoaderValue<ValueLoader>>>,
  Partial<Record<LoaderValue<KeyLoader>, LoaderData<ValueLoader>>>,
  | TypeNameError<"object">
  | Payload<{
      RECORD: {
        keyToError;
      };
    }>
>;

export function RecordLoader<
  KeyLoader extends Loader<string, any, any>,
  ValueLoader extends AnyLoader
>(
  keyLoader: KeyLoader,
  valueLoader: ValueLoader
): RecordLoader<KeyLoader, ValueLoader> {
  return pipe(
    checkType("object"),
    loadToValue(async (data) => {
      const keyToValue: Partial<Record<
        LoaderValue<KeyLoader>,
        LoaderValue<ValueLoader>
      >> = {};
      const keyToError: Record<string, any> = <any>{};
      for (const [dataKey, dataValue] of entries(data)) {
        const keyResult = await loadToPromise(keyLoader, dataKey);
        if ("error" in keyResult) {
          keyToError[dataKey] = { type: "KEY", error: keyResult.error };
          continue;
        }
        const valueResult = await loadToPromise(valueLoader, dataValue as any);
        if ("error" in valueResult) {
          keyToError[dataKey] = { type: "VALUE", error: valueResult.error };
          continue;
        }
        keyToValue[keyResult.value] = valueResult.value;
      }
      return { keyToValue, keyToError };
    }),
    keyToErrorCheck("RECORD"),
    loadToKey("keyToValue")
  );
}
