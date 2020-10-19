import { ObservedValueOf, OperatorFunction } from "rxjs";
import { LoadResult } from "./LoadResult";

export type Loader<V, D, E> = OperatorFunction<D, LoadResult<V, E>>;

export type AnyLoader = Loader<any, any, any>;

export type LoaderValue<T extends AnyLoader> = T extends Loader<
  infer U,
  any,
  any
>
  ? U
  : never;

export type LoaderData<T extends AnyLoader> = T extends Loader<
  any,
  infer U,
  any
>
  ? U
  : never;

export type LoaderError<T extends AnyLoader> = T extends Loader<
  any,
  any,
  infer U
>
  ? U
  : never;
