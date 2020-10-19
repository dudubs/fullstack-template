import { OperatorFunction } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { Awaitable, Awaited } from "../../../server/typings";
import { LoadError } from "../LoadError";
import { LoadResult, LoadResultError, LoadResultValue } from "../LoadResult";

export function checkLoader<
  T extends LoadResult<any, any>,
  V extends LoadResultValue<T>,
  E extends LoadResultError<T>,
  O extends Awaitable<any>
>(
  getError: (value: V) => O
): OperatorFunction<
  LoadResult<V, E>,
  LoadResult<V, E | NonNullable<Awaited<O>>>
> {
  return mergeMap(async (result) => {
    if ("error" in result) {
      throw new LoadError(result.error);
    }
    const error = await getError(result.value);
    if (error) {
      throw new LoadError(error);
    }
    return result;
  });
}
