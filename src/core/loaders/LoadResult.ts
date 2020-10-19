export type LoadResult<V, E> =
  | {
      value: V;
    }
  | { error: E };

export type LoadResultValue<
  T extends LoadResult<any, any>
> = T extends LoadResult<infer U, any> ? U : never;

export type LoadResultError<
  T extends LoadResult<any, any>
> = T extends LoadResult<any, infer U> ? U : never;
