import { createSession, getSession } from "../getSession";
import { testUser } from "./setupTests";

describe("test getSession", () => {
  it("expect to new secret token", (done) => {
    getSession({
      secretToken: "invalidToken",
      updateSecretToken() {
        done();
      },
    });
  });
  it("expect to load session", async () => {
    const session = await createSession();
    session.user = testUser.entity;
    await session.save();

    const loadedSession = await getSession({
      secretToken: session.secretToken,
      updateSecretToken(secretToken: string) {
        fail();
      },
    });
    expect(loadedSession.user).toBeDefined();
  });
});
