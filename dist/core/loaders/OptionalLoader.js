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
exports.OptionalLoader = void 0;
/*
  OptionalLoader(StringLoader())
 */
const operators_1 = require("rxjs/operators");
const loadToPromise_1 = require("./operators/loadToPromise");
function OptionalLoader(loader) {
    return operators_1.mergeMap((data) => __awaiter(this, void 0, void 0, function* () {
        if (data !== undefined) {
            return loadToPromise_1.loadToPromise(loader, data);
        }
        return { value: undefined };
    }));
}
exports.OptionalLoader = OptionalLoader;
