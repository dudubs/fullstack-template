import { of } from "rxjs";
import {
  AnyLoader,
  Loader,
  LoaderData,
  LoaderError,
  LoaderValue,
} from "../Loader";
import { LoadError } from "../LoadError";
import { LoadResult } from "../LoadResult";

export function loadToPromise<T extends AnyLoader>(
  loader: T,
  data: LoaderData<T>
): Promise<LoadResult<LoaderValue<T>, LoaderError<T>>> {
  return loader(of(data))
    .toPromise()
    .catch((error) => {
      if (error instanceof LoadError) {
        return { error: error.error };
      }
      throw error;
    });
}
