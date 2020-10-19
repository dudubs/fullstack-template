import { pipe } from "rxjs";
import { BaseEntity } from "typeorm";
import { Loader, LoaderData, LoaderError } from "../../core/loaders/Loader";
import { NumberLoader } from "../../core/loaders/NumberLoader";
import { loadToResult } from "../../core/loaders/operators/loadToValue";
import { TextLoader } from "../../core/loaders/TextLoader";
import { UnionLoader } from "../../core/loaders/UnionLoader";

export const EntityIdLoader = UnionLoader("ID_TYPE", {
  string: TextLoader(),
  number: NumberLoader(),
});

export type EntityLoader<T> = Loader<
  T,
  LoaderData<typeof EntityIdLoader>,
  LoaderError<typeof EntityIdLoader> | "NO_ENTITY"
>;

export function EntityLoader<T extends typeof BaseEntity>(
  entityType: T
): EntityLoader<InstanceType<T>> {
  return pipe(
    EntityIdLoader,
    loadToResult(async (id) => {
      const entity = await entityType.findOne(id.value);
      if (!entity) {
        return { error: "NO_ENTITY" } as const;
      }
      return { value: entity as InstanceType<T> } as const;
    })
  );
}
