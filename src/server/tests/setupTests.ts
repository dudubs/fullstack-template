import { createConnection } from "typeorm";
import { Session } from "../entities/Session";
import { User } from "../entities/User";
import { encryptPassword } from "../utils/encryptPassword";

export const testUser = {
  entity: null as null | User,
  password: "123",
};

export const testUsersEntities: User[] = [];

beforeAll(async () => {
  await createConnection({
    type: "sqlite",
    name: "default",
    database: ":memory:",
    synchronize: true,
    entities: [User, Session],
  });

  const encrypedPassword = encryptPassword(testUser.password);

  testUser.entity = await User.save(createUser("Barak Obama"));

  testUsersEntities.push(
    testUser.entity,
    ...(await User.save([createUser("Bill Gates")])),
    ...(await User.save([createUser("Aki Avni")])),
    ...(await User.save([createUser("David Ben Simon")]))
  );

  function createUser(fullName: string) {
    const [firstName] = fullName.split(" ", 1);
    const lastName = fullName.slice(firstName.length + 1).trim();
    return User.create({
      encrypedPassword,
      firstName,
      lastName,
      loginName: (firstName + lastName).toUpperCase(),
    });
  }
});
