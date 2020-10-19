import { mergeMap } from "rxjs/operators";
import { Payload } from "../Result";
import { Loader } from "./Loader";

export type TypeNameToType = {
  string: string;
  number: number;
  boolean: boolean;
  null: null;
  undefined: undefined;
  nullable: null | undefined;
  object: object;
  array: any[];
};
export type TypeName = keyof TypeNameToType;

export type TypeLoader<T extends TypeName> = Loader<
  any,
  TypeNameToType[T],
  Payload<{
    TYPE: {
      expectedType: T;
      gotType: string;
    };
  }>
>;

export type TypeNameError<T extends TypeName> = Payload<{
  TYPE: {
    expectedType: T;
    gotType: string;
  };
}>;

export function checkType<T extends TypeName>(
  expectedType: T
): Loader<TypeNameToType[T], any, TypeNameError<T>> {
  return mergeMap(async (data: any) => {
    switch (expectedType) {
      case "object":
        if (data) {
          return { value: data };
        }
        return {
          error: { type: "TYPE", expectedType, gotType: "null" },
        } as const;
      case "array":
        if (Array.isArray(data)) {
          return { value: data } as const;
        }
        break;
      case "nullable":
        if (data === null) {
          return { value: data } as const;
        }
        break;
      case "string":
      case "number":
      case "boolean":
      case "undefined":
        if (typeof data === expectedType) {
          return { value: data } as const;
        }
        break;
      case "null":
        if (data === null) {
          return { value: null } as const;
        }
        break;
    }
    return {
      error: { type: "TYPE", expectedType, gotType: typeof data } as const,
    };
  });
}
