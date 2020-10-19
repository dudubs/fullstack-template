import { pipe } from "rxjs";
import { Awaitable } from "../../server/typings";
import { Payload } from "../Result";
import { checkLoader } from "./operators/checkLoader";
import { checkLength, LengthError } from "./LengthLoader";
import { Loader } from "./Loader";
import { loadToValue } from "./operators/loadToValue";
import { checkType, TypeNameError } from "./TypeLoader";

export type TextLoaderOptions = {
  maxLength?: number;
  minLength?: number;
  pattern?: RegExp;
  trim?: boolean;
  load?(text: string): Awaitable<string>;
};

// @ts-ignore
export type StringLoader = Loader<
  string,
  string,
  TypeNameError<"string"> | LengthError | "PATTERN"
>;

export function TextLoader({
  maxLength,
  minLength,
  trim,
  pattern,
  load,
}: TextLoaderOptions = {}): StringLoader {
  return pipe(
    checkType("string"),
    loadToValue(async (text) => {
      if (trim) {
        text = text.trim();
      }
      if (load) {
        text = await load(text);
      }
      return text;
    }),
    checkLength({ minLength, maxLength }),
    checkLoader((text) => {
      if (pattern && !pattern.test(text)) {
        return "PATTERN" as const;
      }
    })
  );
}
