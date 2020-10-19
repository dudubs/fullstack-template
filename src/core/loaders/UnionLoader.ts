import { mergeMap } from "rxjs/operators";
import { Union } from "../../server/typings";
import { entries } from "../object/entries";
import {
  AnyLoader,
  Loader,
  LoaderData,
  LoaderError,
  LoaderValue,
} from "./Loader";
import { loadToPromise } from "./operators/loadToPromise";

export type UnionLoader<
  T extends Record<string, AnyLoader>,
  ErrorType extends string
> = Loader<
  Union<{ [K in keyof T]: { type: K; value: LoaderValue<T[K]> } }>,
  Union<
    {
      [K in keyof T]: LoaderData<T[K]>;
    }
  >,
  {
    type: ErrorType;
    typeToError: {
      [K in keyof T]: LoaderError<T[K]>;
    };
  }
>;

export function UnionLoader<
  T extends Record<string, AnyLoader>,
  ErrorType extends string
>(errorType: ErrorType, typeToLoader: T): UnionLoader<T, ErrorType> {
  return mergeMap(async (data: any) => {
    const typeToError: any = {};
    for (const [type, loader] of entries(typeToLoader)) {
      const result = await loadToPromise(loader, data);
      if ("error" in result) {
        typeToError[type] = result.error;
        continue;
      }
      return { value: { type, value: result.value } } as const;
    }
    return {
      error: { type: errorType, typeToError },
    } as const;
  });
}
