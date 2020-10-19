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
const Result_1 = require("../../core/Result");
const LoginHandler_1 = require("../handlers/LoginHandler");
const setupTests_1 = require("./setupTests");
var objectContaining = jasmine.objectContaining;
describe(__filename, () => {
    let loggingUser;
    const login = LoginHandler_1.LoginHandler({
        onLogin(user) {
            loggingUser = user;
        },
    });
    beforeEach(() => {
        loggingUser = null;
    });
    it("expect to login to be fail because loginName", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield login({ loginName: "badUserName", password: setupTests_1.testUser.password })).toEqual(objectContaining(Result_1.FAILED));
    }));
    it("expect to login to be fail because password", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield login({
            loginName: setupTests_1.testUser.entity.loginName,
            password: "badPassword",
        })).toEqual(objectContaining(Result_1.FAILED));
    }));
    it("expect login to be success", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield login({
            loginName: setupTests_1.testUser.entity.loginName,
            password: setupTests_1.testUser.password,
        })).toEqual(objectContaining(Object.assign(Object.assign({}, Result_1.SUCCESS), { helloTo: setupTests_1.testUser.entity.fullName })));
    }));
});
