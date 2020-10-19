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
const pick_1 = require("../../core/object/pick");
const Result_1 = require("../../core/Result");
const RegisterHandler_1 = require("../handlers/RegisterHandler");
const setupTests_1 = require("./setupTests");
var objectContaining = jasmine.objectContaining;
describe(__filename, () => {
    let registeredUser;
    const handler = RegisterHandler_1.RegisterHandler({
        onRegister(user) {
            registeredUser = user;
        },
    });
    beforeEach(() => {
        registeredUser = undefined;
    });
    it("expect to fail because loginName already in use", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield handler(Object.assign(Object.assign({}, pick_1.pick(setupTests_1.testUser.entity, "loginName", "lastName", "firstName")), { password: "121212" }))).toEqual(objectContaining(Object.assign(Object.assign({}, Result_1.FAILED), { reason: "INPUT", error: objectContaining({
                type: "OBJECT",
                keyToError: objectContaining({
                    loginName: "ALREADY_IN_USE",
                }),
            }) })));
    }));
    it("expect to success register", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield handler({
            password: "121212",
            loginName: "testUser",
            firstName: "Bozi",
            lastName: "Herzog",
        })).toEqual(objectContaining(Object.assign({}, Result_1.SUCCESS)));
        expect(registeredUser).toBeDefined();
    }));
});
