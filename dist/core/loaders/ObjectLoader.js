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
exports.ObjectLoader = void 0;
const rxjs_1 = require("rxjs");
const entries_1 = require("../object/entries");
const keyToErrorCheck_1 = require("./operators/keyToErrorCheck");
const loadToPromise_1 = require("./operators/loadToPromise");
const loadToValue_1 = require("./operators/loadToValue");
const TypeLoader_1 = require("./TypeLoader");
function ObjectLoader(keyToLoader) {
    //
    return rxjs_1.pipe(TypeLoader_1.checkType("object"), loadToValue_1.loadToValue((keyToData) => __awaiter(this, void 0, void 0, function* () {
        const keyToError = {};
        const keyToValue = {};
        for (let [key, loader] of entries_1.entries(keyToLoader)) {
            const result = yield loadToPromise_1.loadToPromise(loader, keyToData[key]);
            if ("error" in result) {
                keyToError[key] = result.error;
                continue;
            }
            keyToValue[key] = result.value;
        }
        return { keyToValue, keyToError };
    })), keyToErrorCheck_1.keyToErrorCheck("OBJECT"), loadToValue_1.loadToKey("keyToValue"));
}
exports.ObjectLoader = ObjectLoader;
