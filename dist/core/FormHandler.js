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
exports.FormHandler = void 0;
const loadToPromise_1 = require("./loaders/operators/loadToPromise");
const Result_1 = require("./Result");
function FormHandler(input, { onSubmit, }) {
    return (data) => __awaiter(this, void 0, void 0, function* () {
        const result = yield loadToPromise_1.loadToPromise(input, data);
        if ("error" in result) {
            return Object.assign(Object.assign({}, Result_1.FAILED), { reason: "INPUT", error: result.error });
        }
        return onSubmit(result.value);
    });
}
exports.FormHandler = FormHandler;
