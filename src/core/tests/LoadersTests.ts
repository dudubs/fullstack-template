import { of, pipe } from "rxjs";
import { checkLoader } from "../loaders/operators/checkLoader";
import { AnyLoader, Loader, LoaderData, LoaderValue } from "../loaders/Loader";
import { loadToPromise } from "../loaders/operators/loadToPromise";
import { NumberLoader } from "../loaders/NumberLoader";
import { ObjectLoader } from "../loaders/ObjectLoader";

import { OptionalLoader } from "../loaders/OptionalLoader";
import { TextLoader } from "../loaders/TextLoader";
import { SwitchLoader } from "../loaders/SwitchLoader";
import objectContaining = jasmine.objectContaining;

const FailedLoader: Loader<any, any, any> = () =>
  of({ error: { type: "INVALID" } });

it("expect FailedLoader to fail", () => {
  return expectLoader(FailedLoader).toFail(null);
});

describe("test SwitchLoader", () => {
  const t = expectLoader(
    SwitchLoader({
      number: NumberLoader({ max: 10 }),
      text: TextLoader(),
    })
  );

  it("expect to fail because type", () =>
    t.toFail(
      {
        // @ts-expect-error
        type: "x",
        data: "",
      },
      {
        type: "TYPE_KEY",
      }
    ));

  it("expect to fail because value", () =>
    t.toFail(
      { type: "number", data: 11 },
      {
        type: "VALUE",
        caseType: "number",
        error: objectContaining({
          type: "MAX_VALUE",
        }),
      }
    ));
  it("expect to success", () =>
    t.toSuccess({ type: "text", data: "x" }, { type: "text", value: "x" }));
});

describe("test ObjectLoader", () => {
  const t = expectLoader(
    ObjectLoader({
      xs: TextLoader(),
      xn: OptionalLoader(FailedLoader),
    })
  );

  it("expect to fail", () => t.toFail({ xs: "hello", xn: 0 }));
  it("expect to success", () =>
    t.toSuccess({ xs: "hello" }, { xs: "hello", xn: undefined }));
});

describe("test OptionalLoader", () => {
  const t = expectLoader(OptionalLoader(FailedLoader));
  it("expect to fail", () => t.toFail(4));
  it("expect to success", () => t.toSuccess(undefined, undefined));
});

describe("test NumberLoader", () => {
  const t = expectLoader(NumberLoader({ min: 5, max: 10 }));
  it("expect to fail because min value", () =>
    t.toFail(4, {
      type: "MIN_VALUE",
      minValue: 5,
    }));
  it("expect to fail because max value", () =>
    t.toFail(11, {
      type: "MAX_VALUE",
      maxValue: 10,
    }));
  it("expect to success", () => t.toSuccess(7, 7));
});

describe("test StringLoader", () => {
  const minLength = 2;
  const maxLength = 4;
  const failBecauseCheck = "fbc";

  const t = expectLoader(
    pipe(
      TextLoader({
        minLength,
        maxLength,
        pattern: /^[^\d]+$/, // without number digits,
      }),
      checkLoader((text) => {
        if (text === failBecauseCheck) {
          return { type: "CHECK" } as const;
        }
      })
    )
  );

  it("expect to fail because minLength", () =>
    t.toFail("x", { type: "MIN_LENGTH", minLength }));

  it("expect to fail because maxLength", () =>
    t.toFail("xxxxx", { type: "MAX_LENGTH", maxLength }));

  it("expect to fail because pattern", () => t.toFail("x7x", "PATTERN"));

  it("expect to fail because check", () =>
    t.toFail(failBecauseCheck, { type: "CHECK" }));

  it("expect to load and trim", () =>
    expectLoader(TextLoader({ trim: true, load: (x) => `[${x}]` })).toSuccess(
      " x ",
      "[x]"
    ));
});

export function expectLoader<T extends AnyLoader>(loader: T) {
  return {
    async toFail(data: LoaderData<T>, expectedError?) {
      switch (typeof expectedError) {
        case "object":
        case "undefined":
          expectedError = objectContaining({ ...expectedError });
          break;
      }
      const result = await loadToPromise(loader, data);
      if (!("error" in result)) throw new Error(`Expected to failed`);
      expect(result.error).toEqual(expectedError);
    },
    async toSuccess(data: LoaderData<T>, expectedValue: LoaderValue<T>) {
      const result = await loadToPromise(loader, data);
      if ("error" in result)
        throw new Error(`Unexpected error ${JSON.stringify(result.error)}`);
      expect(result.value).toEqual(expectedValue);
    },
  };
}
