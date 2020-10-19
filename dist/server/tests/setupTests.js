"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testUsersEntities = exports.testUser = void 0;
const typeorm_1 = require("typeorm");
const Session_1 = require("../entities/Session");
const User_1 = require("../entities/User");
const encryptPassword_1 = require("../utils/encryptPassword");
exports.testUser = {
    entity: null,
    password: "123",
};
exports.testUsersEntities = [];
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield typeorm_1.createConnection({
        type: "sqlite",
        name: "default",
        database: ":memory:",
        synchronize: true,
        entities: [User_1.User, Session_1.Session],
    });
    const encrypedPassword = encryptPassword_1.encryptPassword(exports.testUser.password);
    exports.testUser.entity = yield User_1.User.save(createUser("Barak Obama"));
    exports.testUsersEntities.push(exports.testUser.entity, ...(yield User_1.User.save([createUser("Bill Gates")])), ...(yield User_1.User.save([createUser("Aki Avni")])), ...(yield User_1.User.save([createUser("David Ben Simon")])));
    function createUser(fullName) {
        const [firstName] = fullName.split(" ", 1);
        const lastName = fullName.slice(firstName.length + 1).trim();
        return User_1.User.create({
            encrypedPassword,
            firstName,
            lastName,
            loginName: (firstName + lastName).toUpperCase(),
        });
    }
}));
