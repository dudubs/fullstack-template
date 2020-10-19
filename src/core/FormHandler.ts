import { Awaitable } from "../server/typings";
import {
  AnyLoader,
  LoaderData,
  LoaderError,
  LoaderValue,
} from "./loaders/Loader";
import { loadToPromise } from "./loaders/operators/loadToPromise";
import { FAILED, SucessOrFailed } from "./Result";

export function FormHandler<
  Input extends AnyLoader,
  Result extends SucessOrFailed
>(
  input: Input,
  {
    onSubmit,
  }: {
    onSubmit(value: LoaderValue<Input>): Awaitable<Result>;
  }
): (
  data: LoaderData<Input>
) => Promise<
  | Result
  | (typeof FAILED & {
      reason: "INPUT";
      error: LoaderError<Input>;
    })
> {
  return async (data) => {
    const result = await loadToPromise(input, data);
    if ("error" in result) {
      return { ...FAILED, reason: "INPUT", error: result.error };
    }
    return onSubmit(result.value);
  };
}
