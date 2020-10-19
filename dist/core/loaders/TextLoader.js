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
exports.TextLoader = void 0;
const rxjs_1 = require("rxjs");
const checkLoader_1 = require("./operators/checkLoader");
const LengthLoader_1 = require("./LengthLoader");
const loadToValue_1 = require("./operators/loadToValue");
const TypeLoader_1 = require("./TypeLoader");
function TextLoader({ maxLength, minLength, trim, pattern, load, } = {}) {
    return rxjs_1.pipe(TypeLoader_1.checkType("string"), loadToValue_1.loadToValue((text) => __awaiter(this, void 0, void 0, function* () {
        if (trim) {
            text = text.trim();
        }
        if (load) {
            text = yield load(text);
        }
        return text;
    })), LengthLoader_1.checkLength({ minLength, maxLength }), checkLoader_1.checkLoader((text) => {
        if (pattern && !pattern.test(text)) {
            return "PATTERN";
        }
    }));
}
exports.TextLoader = TextLoader;
