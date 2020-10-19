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
exports.checkType = void 0;
const operators_1 = require("rxjs/operators");
function checkType(expectedType) {
    return operators_1.mergeMap((data) => __awaiter(this, void 0, void 0, function* () {
        switch (expectedType) {
            case "object":
                if (data) {
                    return { value: data };
                }
                return {
                    error: { type: "TYPE", expectedType, gotType: "null" },
                };
            case "array":
                if (Array.isArray(data)) {
                    return { value: data };
                }
                break;
            case "nullable":
                if (data === null) {
                    return { value: data };
                }
                break;
            case "string":
            case "number":
            case "boolean":
            case "undefined":
                if (typeof data === expectedType) {
                    return { value: data };
                }
                break;
            case "null":
                if (data === null) {
                    return { value: null };
                }
                break;
        }
        return {
            error: { type: "TYPE", expectedType, gotType: typeof data },
        };
    }));
}
exports.checkType = checkType;
