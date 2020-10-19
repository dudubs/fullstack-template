import { pipe } from "rxjs";
import { Union } from "../../server/typings";
import { Payload } from "../Result";
import {
  AnyLoader,
  Loader,
  LoaderData,
  LoaderError,
  LoaderValue,
} from "./Loader";
import { loadToPromise } from "./operators/loadToPromise";
import { loadToResult } from "./operators/loadToValue";

import { checkType, TypeNameError } from "./TypeLoader";

export type SwitchLoader<T extends Record<string, AnyLoader>> = Loader<
  Union<{ [K in keyof T]: { type: K; value: LoaderValue<T[K]> } }>,
  Union<
    {
      [K in keyof T]: { type: K; data: LoaderData<T[K]> };
    }
  >,
  | TypeNameError<"object">
  | Payload<{
      TYPE_KEY: { expectedKeys: (keyof T)[]; gotKey: string };
      VALUE: Union<
        {
          [K in keyof T]: {
            caseType: K;
            error: LoaderError<T[K]>;
          };
        }
      >;
    }>
>;

export function SwitchLoader<T extends Record<string, AnyLoader>>(
  typeToLoader: T
): SwitchLoader<T> {
  return pipe(
    checkType("object"),
    loadToResult(async ({ data, type }: any) => {
      const loader = typeToLoader[type];
      if (!loader)
        return {
          error: {
            type: "TYPE_KEY",
            expectedKeys: Object.keys(typeToLoader) as (keyof T)[],
            gotKey: type as string,
          } as const,
        };
      const result = await loadToPromise(loader, data);
      if ("error" in result) {
        return {
          error: {
            type: "VALUE",
            caseType: type,
            error: result.error,
          } as const,
        };
      }
      return { value: { type, value: result.value } } as const;
    })
  );
}
