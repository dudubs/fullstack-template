"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersQueryHandler = void 0;
const User_1 = require("../entities/User");
const QueryHandler_1 = require("./QueryHandler");
function UsersQueryHandler() {
    return QueryHandler_1.QueryHandler({
        entityType: User_1.User,
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
exports.UsersQueryHandler = UsersQueryHandler;
