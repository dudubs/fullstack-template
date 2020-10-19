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
exports.ExpressTester = void 0;
const express_1 = __importDefault(require("express"));
const TEST_PORT = 7777;
const TEST_ADDR = "0.0.0.0";
const TEST_URL = `http://${TEST_ADDR}:${TEST_PORT}`;
const app = express_1.default();
let server;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield new Promise((resolve) => {
        server = app.listen(TEST_PORT, TEST_ADDR, () => resolve());
    });
}));
app.use((...args) => {
    return currentHandler(...args);
});
afterAll(() => {
    server.close();
});
afterEach(() => {
    currentHandler = noHandler;
});
let currentHandler;
function noHandler() {
    fail(`No handler`);
}
var ExpressTester;
(function (ExpressTester) {
    function getUrl(path = "/") {
        return TEST_URL + path;
    }
    ExpressTester.getUrl = getUrl;
    function setHandler(handler) {
        currentHandler = handler;
    }
    ExpressTester.setHandler = setHandler;
    function testHandler(handler, context) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            setHandler(handler);
            return context(TEST_URL);
        });
    }
    ExpressTester.testHandler = testHandler;
})(ExpressTester = exports.ExpressTester || (exports.ExpressTester = {}));
