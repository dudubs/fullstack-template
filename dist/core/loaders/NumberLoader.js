"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberLoader = void 0;
const rxjs_1 = require("rxjs");
const checkLoader_1 = require("./operators/checkLoader");
const TypeLoader_1 = require("./TypeLoader");
function NumberLoader({ max, min, } = {}) {
    return rxjs_1.pipe(TypeLoader_1.checkType("number"), checkLoader_1.checkLoader((value) => {
        if (min && min > value) {
            return { type: "MIN_VALUE", minValue: min };
        }
    }), checkLoader_1.checkLoader((value) => {
        if (max && value > max) {
            return { type: "MAX_VALUE", maxValue: max };
        }
    }));
}
exports.NumberLoader = NumberLoader;
