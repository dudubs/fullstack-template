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
exports.checkLoader = void 0;
const operators_1 = require("rxjs/operators");
const LoadError_1 = require("../LoadError");
function checkLoader(getError) {
    return operators_1.mergeMap((result) => __awaiter(this, void 0, void 0, function* () {
        if ("error" in result) {
            throw new LoadError_1.LoadError(result.error);
        }
        const error = yield getError(result.value);
        if (error) {
            throw new LoadError_1.LoadError(error);
        }
        return result;
    }));
}
exports.checkLoader = checkLoader;
