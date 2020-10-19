import { User } from "../entities/User";
import { QueryHandler } from "./QueryHandler";

export function UsersQueryHandler() {
  return QueryHandler({
    entityType: User,
    aliasName: "user",
    fields: {
      id: { selection: "user.id" },
      loginName: { selection: "user.loginName" },
      firstName: { selection: "user.firstName" },
      lastName: { selection: "user.lastName" },
      fullName: {
        selection: "user.firstName || user.lastName",
        optional: true,
      },
    },
  });
}
