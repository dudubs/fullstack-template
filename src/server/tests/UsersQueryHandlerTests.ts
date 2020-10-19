import { FAILED, SUCCESS } from "../../core/Result";
import { UsersQueryHandler } from "../handlers/UsersQueryHandler";
import arrayContaining = jasmine.arrayContaining;
import objectContaining = jasmine.objectContaining;

describe(__filename, () => {
  const handler = UsersQueryHandler();

  it("expect to limit rows", async () => {
    expect(await getSuccessData({ take: 1 }).then((x) => x.length)).toEqual(1);
    expect(await getSuccessData({ take: 2 }).then((x) => x.length)).toEqual(2);
  });

  it("expect to skip rows", async () => {
    const first = await getOneRow({ skip: 0 });
    const notFirst = await getOneRow({ skip: 1 });
    expect(first.id).not.toEqual(notFirst.id);
  });

  it("expect to be by order", async () => {
    const first = await getOneRow({ order: { id: "ASC" } });
    const notFirst = await getOneRow({ order: { id: "DESC" } });
    expect(first.id).not.toEqual(notFirst.id);
  });

  it("expect not failed because invalid order", async () => {
    expect(
      await handler({
        order: {
          // @ts-expect-error
          id: "invalidOrder",
        },
      })
    ).toEqual(objectContaining(FAILED));
  });

  it("expect not failed because invalid sort field", async () => {
    expect(
      await handler({
        order: {
          // @ts-expect-error
          invalidField: "ASC",
        },
      })
    ).toEqual(objectContaining(FAILED));
  });

  it("expect to default fields", async () => {
    expect(Object.keys(await getOneRow({}))).toEqual(
      arrayContaining(["id", "loginName", "firstName", "lastName"])
    );
  });

  it("expect to get specific fields", async () => {
    expect(Object.keys(await getOneRow({ get: ["id", "fullName"] }))).toEqual(
      arrayContaining(["id", "fullName"])
    );
  });

  it("expect to fail because invalid field", async () => {
    expect(
      await handler({
        get: [
          // @ts-expect-error
          "invalidField",
        ],
      })
    ).toEqual(objectContaining(FAILED));
  });

  function getOneRow(...[options]: Parameters<typeof handler>) {
    return getSuccessData({ ...options, take: 1 }).then((x) => x[0]);
  }

  async function getSuccessData(...[options]: Parameters<typeof handler>) {
    const result = await handler(options);

    if (result.type === SUCCESS.type) {
      return result.rows;
    }

    throw new Error(JSON.stringify({ result }));
  }
});
