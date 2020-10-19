import { OperatorFunction } from "rxjs";
import { hasKeys } from "../../object/hasKeys";
import { checkLoader } from "./checkLoader";
import { LoadResult, LoadResultError, LoadResultValue } from "../LoadResult";

export function keyToErrorCheck<
  ErrorType extends string,
  T extends LoadResult<{ keyToError: object }, any>,
  V extends LoadResultValue<T> & { keyToError: object },
  E extends LoadResultError<T>
>(
  errorType: ErrorType
): OperatorFunction<
  LoadResult<V, E>,
  LoadResult<V, E | { type: ErrorType; keyToError: V["keyToError"] }>
> {
  return checkLoader((value) => {
    if (hasKeys(value.keyToError)) {
      return { type: errorType, keyToError: value.keyToError };
    }
  });
}
