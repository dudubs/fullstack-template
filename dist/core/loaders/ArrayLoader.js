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
exports.ArrayLoader = void 0;
const rxjs_1 = require("rxjs");
const hasKeys_1 = require("../object/hasKeys");
const checkLoader_1 = require("./operators/checkLoader");
const LengthLoader_1 = require("./LengthLoader");
const loadToPromise_1 = require("./operators/loadToPromise");
const loadToValue_1 = require("./operators/loadToValue");
const TypeLoader_1 = require("./TypeLoader");
function ArrayLoader(itemLoader, { maxLength, minLength, getKey, ignoreUniqueKey } = {}) {
    return rxjs_1.pipe(TypeLoader_1.checkType("array"), LengthLoader_1.checkLength({ minLength, maxLength }), loadToValue_1.loadToValue((data) => __awaiter(this, void 0, void 0, function* () {
        const values = [];
        const indexToError = {};
        const keys = new Set();
        for (const [index, itemData] of data.entries()) {
            const item = yield loadToPromise_1.loadToPromise(itemLoader, itemData);
            if ("error" in item) {
                indexToError[index] = { type: "TARGET", targetError: item.error };
                continue;
            }
            if (getKey) {
                const key = getKey(item.value);
                if (keys.has(key)) {
                    if (!ignoreUniqueKey)
                        indexToError[index] = { type: "UNIQUE_KEY", key };
                    continue;
                }
                keys.add(key);
            }
            values.push(item.value);
        }
        return { values, indexToError };
    })), checkLoader_1.checkLoader(({ indexToError }) => {
        if (hasKeys_1.hasKeys(indexToError))
            return { type: "ITEMS", indexToError };
    }), loadToValue_1.loadToKey("values"));
}
exports.ArrayLoader = ArrayLoader;
