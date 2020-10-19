import { inspect } from "util";
import { pick } from "../../core/object/pick";
import { FAILED, SUCCESS } from "../../core/Result";
import { User } from "../entities/User";
import { RegisterHandler } from "../handlers/RegisterHandler";
import { testUser } from "./setupTests";
import objectContaining = jasmine.objectContaining;

describe(__filename, () => {
  let registeredUser: User | undefined;
  const handler = RegisterHandler({
    onRegister(user) {
      registeredUser = user;
    },
  });
  beforeEach(() => {
    registeredUser = undefined;
  });
  it("expect to fail because loginName already in use", async () => {
    expect(
      await handler({
        ...pick(testUser.entity!, "loginName", "lastName", "firstName"),
        password: "121212",
      })
    ).toEqual(
      objectContaining({
        ...FAILED,
        reason: "INPUT",
        error: objectContaining({
          type: "OBJECT",
          keyToError: objectContaining({
            loginName: "ALREADY_IN_USE",
          }),
        }),
      })
    );
  });
  it("expect to success register", async () => {
    expect(
      await handler({
        password: "121212",
        loginName: "testUser",
        firstName: "Bozi",
        lastName: "Herzog",
      })
    ).toEqual(objectContaining({ ...SUCCESS }));
    expect(registeredUser).toBeDefined();
  });
});
