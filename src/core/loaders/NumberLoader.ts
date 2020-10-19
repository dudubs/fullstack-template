import { pipe } from "rxjs";
import { Awaitable } from "../../server/typings";
import { Payload } from "../Result";
import { checkLoader } from "./operators/checkLoader";
import { Loader } from "./Loader";
import { checkType, TypeNameError } from "./TypeLoader";

export type NumberLoader = Loader<
  number,
  number,
  | TypeNameError<"number">
  | Payload<{
      MAX_VALUE: { maxValue: number };
      MIN_VALUE: { minValue: number };
    }>
>;

export function NumberLoader({
  max,
  min,
}: NumberLoaderOptions = {}): NumberLoader {
  return pipe(
    checkType("number"),
    checkLoader((value) => {
      if (min && min > value) {
        return { type: "MIN_VALUE", minValue: min } as const;
      }
    }),
    checkLoader((value) => {
      if (max && value > max) {
        return { type: "MAX_VALUE", maxValue: max } as const;
      }
    })
  );
}

export type NumberLoaderOptions = {
  max?: number;
  min?: number;
  load?(value: number): Awaitable<number>;
};
