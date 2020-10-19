import { OperatorFunction } from "rxjs";
import { Payload } from "../Result";
import { checkLoader } from "./operators/checkLoader";
import { LoadResult, LoadResultError, LoadResultValue } from "./LoadResult";

export type LengthError = Payload<{
  MIN_LENGTH: { minLength: number };
  MAX_LENGTH: { maxLength: number };
}>;

export function checkLength<
  T extends LoadResult<{ length: number }, any>,
  V extends LoadResultValue<T> & { length: number },
  E extends LoadResultError<T>
>({
  minLength,
  maxLength,
}: {
  minLength?: number;
  maxLength?: number;
}): OperatorFunction<LoadResult<V, E>, LoadResult<V, E | LengthError>> {
  return checkLoader(async (value) => {
    if (maxLength && value.length > maxLength) {
      return { type: "MAX_LENGTH", maxLength } as const;
    }
    if (minLength && minLength > value.length) {
      return { type: "MIN_LENGTH", minLength } as const;
    }
  });
}
