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
const UsersQueryHandler_1 = require("../handlers/UsersQueryHandler");
var arrayContaining = jasmine.arrayContaining;
var objectContaining = jasmine.objectContaining;
describe(__filename, () => {
    const handler = UsersQueryHandler_1.UsersQueryHandler();
    it("expect to limit rows", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield getSuccessData({ take: 1 }).then((x) => x.length)).toEqual(1);
        expect(yield getSuccessData({ take: 2 }).then((x) => x.length)).toEqual(2);
    }));
    it("expect to skip rows", () => __awaiter(void 0, void 0, void 0, function* () {
        const first = yield getOneRow({ skip: 0 });
        const notFirst = yield getOneRow({ skip: 1 });
        expect(first.id).not.toEqual(notFirst.id);
    }));
    it("expect to be by order", () => __awaiter(void 0, void 0, void 0, function* () {
        const first = yield getOneRow({ order: { id: "ASC" } });
        const notFirst = yield getOneRow({ order: { id: "DESC" } });
        expect(first.id).not.toEqual(notFirst.id);
    }));
    it("expect not failed because invalid order", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield handler({
            order: {
                // @ts-expect-error
                id: "invalidOrder",
            },
        })).toEqual(objectContaining(Result_1.FAILED));
    }));
    it("expect not failed because invalid sort field", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield handler({
            order: {
                // @ts-expect-error
                invalidField: "ASC",
            },
        })).toEqual(objectContaining(Result_1.FAILED));
    }));
    it("expect to default fields", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(Object.keys(yield getOneRow({}))).toEqual(arrayContaining(["id", "loginName", "firstName", "lastName"]));
    }));
    it("expect to get specific fields", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(Object.keys(yield getOneRow({ get: ["id", "fullName"] }))).toEqual(arrayContaining(["id", "fullName"]));
    }));
    it("expect to fail because invalid field", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield handler({
            get: [
                // @ts-expect-error
                "invalidField",
            ],
        })).toEqual(objectContaining(Result_1.FAILED));
    }));
    function getOneRow(...[options]) {
        return getSuccessData(Object.assign(Object.assign({}, options), { take: 1 })).then((x) => x[0]);
    }
    function getSuccessData(...[options]) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield handler(options);
            if (result.type === Result_1.SUCCESS.type) {
                return result.rows;
            }
            throw new Error(JSON.stringify({ result }));
        });
    }
});
