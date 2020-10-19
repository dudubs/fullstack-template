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
const loadToPromise_1 = require("../../core/loaders/operators/loadToPromise");
const User_1 = require("../entities/User");
const EntityLoader_1 = require("../loaders/EntityLoader");
const UniqueLoginNameLoader_1 = require("../loaders/UniqueLoginNameLoader");
const setupTests_1 = require("./setupTests");
var objectContaining = jasmine.objectContaining;
describe("test EntityLoader", () => {
    const loader = EntityLoader_1.EntityLoader(User_1.User);
    it("expect to load entity", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield loadToPromise_1.loadToPromise(loader, setupTests_1.testUser.entity.id)).toEqual(objectContaining({
            value: objectContaining(Object.assign({}, setupTests_1.testUser.entity)),
        }));
    }));
    it("expect to fail load entity because invalid id", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield loadToPromise_1.loadToPromise(loader, "invalidId")).toEqual(objectContaining({
            error: "NO_ENTITY",
        }));
    }));
});
describe("test UniqueLoginNameLoader", () => {
    const loader = UniqueLoginNameLoader_1.UniqueLoginNameLoader();
    it("expect to error because loginName already in use.", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield loadToPromise_1.loadToPromise(loader, setupTests_1.testUser.entity.loginName)).toEqual(objectContaining({ error: "ALREADY_IN_USE" }));
    }));
    it("expect to success", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield loadToPromise_1.loadToPromise(loader, "hello")).toEqual(objectContaining({ value: "hello" }));
    }));
});
