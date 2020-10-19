import rp from "request-promise";
import { FAILED, SUCCESS } from "../../core/Result";
import { createAppRouter } from "../createAppRouter";
import { useHandler } from "../useHandler";
import { createAppConnection } from "../../common/createAppConnection";
import { ExpressTester } from "./ExpressTester";
import { testUser } from "./setupTests";
import any = jasmine.any;
import objectContaining = jasmine.objectContaining;

const TEST_SESSION_ID = "/test-session-id";

describe(__filename, () => {
  const router = createAppRouter();

  const authenticatedApi = createAppApiForTesting(rp.jar());
  const notAuthenticatedApi = createAppApiForTesting(rp.jar());

  beforeEach(() => {
    ExpressTester.setHandler(router);
  });

  useHandler(router, TEST_SESSION_ID, (req) => () => {
    return { sessionId: req.session.id };
  });

  beforeAll(async () => {
    ExpressTester.setHandler(router);
    expect(
      await authenticatedApi.login({
        loginName: testUser.entity!.loginName,
        password: testUser.password,
      })
    ).toEqual(objectContaining(SUCCESS));
  });

  it("expect to block authenticated users to login", async () => {
    expect(
      await authenticatedApi.login({
        loginName: "test",
        password: "test",
      })
    ).toEqual(objectContaining({ ...FAILED, reason: "NOT_ALLOWED" }));
  });

  it("expect to block not-authenticated guests to logout", async () => {
    expect(await notAuthenticatedApi.logout()).toEqual(
      objectContaining({ ...FAILED, reason: "NOT_ALLOWED" })
    );
  });

  describe("Session sanity:", () => {
    const jar1 = rp.jar();
    const jar2 = rp.jar();

    it("expect to get session id", async () => {
      expect(await getSessionId(jar1)).toEqual(any(Number));
    });

    it("expect to different session ids", async () => {
      expect(await getSessionId(jar1)).not.toEqual(await getSessionId(jar2));
    });

    function getSessionId(jar) {
      return post(TEST_SESSION_ID, {}, jar).then((x) => x.sessionId);
    }
  });

  async function post(path, body, jar?) {
    return rp.post(ExpressTester.getUrl(path), {
      jar,
      json: body,
    });
  }

  function createAppApiForTesting(jar) {
    return createAppConnection(async (path, body = {}) => {
      return post(path, body, jar);
    });
  }
});
