import { loadToPromise } from "../../core/loaders/operators/loadToPromise";
import { User } from "../entities/User";
import { EntityLoader } from "../loaders/EntityLoader";
import { UniqueLoginNameLoader } from "../loaders/UniqueLoginNameLoader";
import { testUser } from "./setupTests";
import objectContaining = jasmine.objectContaining;

describe("test EntityLoader", () => {
  const loader = EntityLoader(User);

  it("expect to load entity", async () => {
    expect(await loadToPromise(loader, testUser.entity!.id)).toEqual(
      objectContaining({
        value: objectContaining({ ...testUser.entity }),
      })
    );
  });

  it("expect to fail load entity because invalid id", async () => {
    expect(await loadToPromise(loader, "invalidId")).toEqual(
      objectContaining({
        error: "NO_ENTITY",
      })
    );
  });
});

describe("test UniqueLoginNameLoader", () => {
  const loader = UniqueLoginNameLoader();

  it("expect to error because loginName already in use.", async () => {
    expect(await loadToPromise(loader, testUser.entity!.loginName)).toEqual(
      objectContaining({ error: "ALREADY_IN_USE" })
    );
  });

  it("expect to success", async () => {
    expect(await loadToPromise(loader, "hello")).toEqual(
      objectContaining({ value: "hello" })
    );
  });
});
