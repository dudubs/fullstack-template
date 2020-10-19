import { ObservableInput, ObservedValueOf, OperatorFunction, pipe } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { Awaitable, Awaited } from "../../../server/typings";
import { LoadError } from "../LoadError";
import { LoadResult, LoadResultError, LoadResultValue } from "../LoadResult";

export function loadToValue<
  T extends LoadResult<any, any>,
  V extends LoadResultValue<T>,
  E extends LoadResultError<T>,
  O extends Awaitable<any>
>(
  callback: (value: V) => O
): OperatorFunction<LoadResult<V, E>, LoadResult<Awaited<O>, E>> {
  return mergeMap(
    async (result): Promise<any> => {
      if ("error" in result) {
        throw new LoadError(result.error);
      }
      return { value: await callback(result.value) };
    }
  );
}

export function loadToResult<
  T extends LoadResult<any, any>,
  V extends LoadResultValue<T>,
  E extends LoadResultError<T>,
  OV,
  OE,
  O extends Awaitable<LoadResult<OV, OE>>
>(
  callback: (value: V) => O
): OperatorFunction<LoadResult<V, E>, LoadResult<OV, E | OE>> {
  return mergeMap(
    async (result): Promise<any> => {
      if ("error" in result) {
        throw new LoadError(result.error);
      }
      const nextResult: any = await callback(result.value);
      if ("error" in nextResult) {
        throw new LoadError(nextResult.error);
      }
      return { value: nextResult.value };
    }
  );
}

export function loadToKey<
  T extends LoadResult<any, any>,
  V extends LoadResultValue<T>,
  E extends LoadResultError<T>,
  K extends keyof V
>(key: K): OperatorFunction<LoadResult<V, E>, LoadResult<V[K], E>> {
  return loadToValue((value) => value[key]);
}
