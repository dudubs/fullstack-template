"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyLoader = void 0;
const rxjs_1 = require("rxjs");
const mapArrayToObject_1 = require("../object/mapArrayToObject");
const checkLoader_1 = require("./operators/checkLoader");
const loadToValue_1 = require("./operators/loadToValue");
const TypeLoader_1 = require("./TypeLoader");
function KeyLoader(obj) {
    if (Array.isArray(obj)) {
        obj = mapArrayToObject_1.mapArrayToObject(obj, (key) => [key, true]);
    }
    return rxjs_1.pipe(TypeLoader_1.checkType("string"), checkLoader_1.checkLoader((key) => {
        if (!obj.hasOwnProperty(key)) {
            return {
                type: "INVALID_KEY",
                expectedKeys: Object.keys(obj),
                gotKey: key,
            };
        }
    }), loadToValue_1.loadToValue((key) => key));
}
exports.KeyLoader = KeyLoader;
