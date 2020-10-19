/*
  OptionalLoader(StringLoader())
 */
import { mergeMap } from "rxjs/operators";
import {
  AnyLoader,
  Loader,
  LoaderData,
  LoaderError,
  LoaderValue,
} from "./Loader";
import { loadToPromise } from "./operators/loadToPromise";

export function OptionalLoader<T extends AnyLoader>(
  loader: T
): Loader<
  LoaderValue<T> | undefined,
  LoaderData<T> | undefined,
  LoaderError<T>
> {
  return mergeMap(async (data) => {
    if (data !== undefined) {
      return loadToPromise(loader, data);
    }
    return { value: undefined };
  });
}
