import { BaseEntity } from "typeorm";
import { FormHandler } from "../../core/FormHandler";
import { ArrayLoader } from "../../core/loaders/ArrayLoader";
import { KeyLoader } from "../../core/loaders/KeyLoader";
import { NumberLoader } from "../../core/loaders/NumberLoader";
import { ObjectLoader } from "../../core/loaders/ObjectLoader";
import { OptionalLoader } from "../../core/loaders/OptionalLoader";
import { RecordLoader } from "../../core/loaders/RecordLoader";
import { entries } from "../../core/object/entries";
import { mapObject } from "../../core/object/mapObject";
import { SUCCESS } from "../../core/Result";

export function QueryHandler<
  T extends typeof BaseEntity,
  FieldKey extends string
>({
  entityType,
  aliasName,
  fields,
}: {
  entityType: typeof BaseEntity;
  aliasName: string;
  fields: Record<
    FieldKey,
    {
      selection: string;
      optional?: boolean;
    }
  >;
}) {
  return FormHandler(
    ObjectLoader({
      skip: OptionalLoader(NumberLoader({ min: 0 })),
      take: OptionalLoader(NumberLoader({ min: 0 })),
      order: OptionalLoader(
        RecordLoader(KeyLoader(fields), KeyLoader({ ASC: true, DESC: true }))
      ),
      get: OptionalLoader(ArrayLoader(KeyLoader(fields))),
    }),
    {
      async onSubmit({ skip, take, order, get }) {
        const qb = entityType
          .createQueryBuilder(aliasName)
          .take(take)
          .skip(skip)
          .select();

        if (!get) {
          get = Object.keys(fields) as FieldKey[];
        }

        if (order)
          for (let [key, type] of entries(order!)) {
            qb.addOrderBy(getFieldAliasName(key), type);
          }

        const fieldKeyToAliasName: Record<string, string> = {};
        for (const fieldKey of get) {
          const field = fields[fieldKey];
          const fieldAliasName = getFieldAliasName(fieldKey);
          fieldKeyToAliasName[fieldKey] = fieldAliasName;
          qb.addSelect(field.selection, fieldAliasName);
        }

        return {
          ...SUCCESS,
          rows: await qb.getRawMany().then((raw) => {
            return raw.map((raw) => {
              return mapObject(
                fieldKeyToAliasName,
                (aliasName) => raw[aliasName]
              );
            });
          }),
        } as const;

        function getFieldAliasName(fieldKey) {
          return fieldKey + "Raw";
        }
      },
    }
  );
}
