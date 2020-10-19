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
exports.EntityLoader = exports.EntityIdLoader = void 0;
const rxjs_1 = require("rxjs");
const NumberLoader_1 = require("../../core/loaders/NumberLoader");
const loadToValue_1 = require("../../core/loaders/operators/loadToValue");
const TextLoader_1 = require("../../core/loaders/TextLoader");
const UnionLoader_1 = require("../../core/loaders/UnionLoader");
exports.EntityIdLoader = UnionLoader_1.UnionLoader("ID_TYPE", {
    string: TextLoader_1.TextLoader(),
    number: NumberLoader_1.NumberLoader(),
});
function EntityLoader(entityType) {
    return rxjs_1.pipe(exports.EntityIdLoader, loadToValue_1.loadToResult((id) => __awaiter(this, void 0, void 0, function* () {
        const entity = yield entityType.findOne(id.value);
        if (!entity) {
            return { error: "NO_ENTITY" };
        }
        return { value: entity };
    })));
}
exports.EntityLoader = EntityLoader;
