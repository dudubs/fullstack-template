import { FAILED, SUCCESS } from "../../core/Result";
import { User } from "../entities/User";
import { LoginHandler } from "../handlers/LoginHandler";
import { testUser } from "./setupTests";
import objectContaining = jasmine.objectContaining;

describe(__filename, () => {
  let loggingUser: User | null;
  const login = LoginHandler({
    onLogin(user) {
      loggingUser = user;
    },
  });
  beforeEach(() => {
    loggingUser = null;
  });
  it("expect to login to be fail because loginName", async () => {
    expect(
      await login({ loginName: "badUserName", password: testUser.password })
    ).toEqual(objectContaining(FAILED));
  });
  it("expect to login to be fail because password", async () => {
    expect(
      await login({
        loginName: testUser.entity!.loginName,
        password: "badPassword",
      })
    ).toEqual(objectContaining(FAILED));
  });

  it("expect login to be success", async () => {
    expect(
      await login({
        loginName: testUser.entity!.loginName,
        password: testUser.password,
      })
    ).toEqual(
      objectContaining({
        ...SUCCESS,
        helloTo: testUser.entity!.fullName,
      })
    );
  });
});
