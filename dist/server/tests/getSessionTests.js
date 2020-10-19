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
const getSession_1 = require("../getSession");
const setupTests_1 = require("./setupTests");
describe("test getSession", () => {
    it("expect to new secret token", (done) => {
        getSession_1.getSession({
            secretToken: "invalidToken",
            updateSecretToken() {
                done();
            },
        });
    });
    it("expect to load session", () => __awaiter(void 0, void 0, void 0, function* () {
        const session = yield getSession_1.createSession();
        session.user = setupTests_1.testUser.entity;
        yield session.save();
        const loadedSession = yield getSession_1.getSession({
            secretToken: session.secretToken,
            updateSecretToken(secretToken) {
                fail();
            },
        });
        expect(loadedSession.user).toBeDefined();
    }));
});
