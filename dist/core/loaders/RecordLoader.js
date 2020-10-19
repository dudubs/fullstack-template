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
exports.RecordLoader = void 0;
const rxjs_1 = require("rxjs");
const entries_1 = require("../object/entries");
const keyToErrorCheck_1 = require("./operators/keyToErrorCheck");
const loadToPromise_1 = require("./operators/loadToPromise");
const loadToValue_1 = require("./operators/loadToValue");
const TypeLoader_1 = require("./TypeLoader");
function RecordLoader(keyLoader, valueLoader) {
    return rxjs_1.pipe(TypeLoader_1.checkType("object"), loadToValue_1.loadToValue((data) => __awaiter(this, void 0, void 0, function* () {
        const keyToValue = {};
        const keyToError = {};
        for (const [dataKey, dataValue] of entries_1.entries(data)) {
            const keyResult = yield loadToPromise_1.loadToPromise(keyLoader, dataKey);
            if ("error" in keyResult) {
                keyToError[dataKey] = { type: "KEY", error: keyResult.error };
                continue;
            }
            const valueResult = yield loadToPromise_1.loadToPromise(valueLoader, dataValue);
            if ("error" in valueResult) {
                keyToError[dataKey] = { type: "VALUE", error: valueResult.error };
                continue;
            }
            keyToValue[keyResult.value] = valueResult.value;
        }
        return { keyToValue, keyToError };
    })), keyToErrorCheck_1.keyToErrorCheck("RECORD"), loadToValue_1.loadToKey("keyToValue"));
}
exports.RecordLoader = RecordLoader;
