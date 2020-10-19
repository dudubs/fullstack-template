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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_promise_1 = __importDefault(require("request-promise"));
const Result_1 = require("../../core/Result");
const createAppRouter_1 = require("../createAppRouter");
const useHandler_1 = require("../useHandler");
const createAppConnection_1 = require("../../common/createAppConnection");
const ExpressTester_1 = require("./ExpressTester");
const setupTests_1 = require("./setupTests");
var any = jasmine.any;
var objectContaining = jasmine.objectContaining;
const TEST_SESSION_ID = "/test-session-id";
describe(__filename, () => {
    const router = createAppRouter_1.createAppRouter();
    const authenticatedApi = createAppApiForTesting(request_promise_1.default.jar());
    const notAuthenticatedApi = createAppApiForTesting(request_promise_1.default.jar());
    beforeEach(() => {
        ExpressTester_1.ExpressTester.setHandler(router);
    });
    useHandler_1.useHandler(router, TEST_SESSION_ID, (req) => () => {
        return { sessionId: req.session.id };
    });
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        ExpressTester_1.ExpressTester.setHandler(router);
        expect(yield authenticatedApi.login({
            loginName: setupTests_1.testUser.entity.loginName,
            password: setupTests_1.testUser.password,
        })).toEqual(objectContaining(Result_1.SUCCESS));
    }));
    it("expect to block authenticated users to login", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield authenticatedApi.login({
            loginName: "test",
            password: "test",
        })).toEqual(objectContaining(Object.assign(Object.assign({}, Result_1.FAILED), { reason: "NOT_ALLOWED" })));
    }));
    it("expect to block not-authenticated guests to logout", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield notAuthenticatedApi.logout()).toEqual(objectContaining(Object.assign(Object.assign({}, Result_1.FAILED), { reason: "NOT_ALLOWED" })));
    }));
    describe("Session sanity:", () => {
        const jar1 = request_promise_1.default.jar();
        const jar2 = request_promise_1.default.jar();
        it("expect to get session id", () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield getSessionId(jar1)).toEqual(any(Number));
        }));
        it("expect to different session ids", () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield getSessionId(jar1)).not.toEqual(yield getSessionId(jar2));
        }));
        function getSessionId(jar) {
            return post(TEST_SESSION_ID, {}, jar).then((x) => x.sessionId);
        }
    });
    function post(path, body, jar) {
        return __awaiter(this, void 0, void 0, function* () {
            return request_promise_1.default.post(ExpressTester_1.ExpressTester.getUrl(path), {
                jar,
                json: body,
            });
        });
    }
    function createAppApiForTesting(jar) {
        return createAppConnection_1.createAppConnection((path, body = {}) => __awaiter(this, void 0, void 0, function* () {
            return post(path, body, jar);
        }));
    }
});
