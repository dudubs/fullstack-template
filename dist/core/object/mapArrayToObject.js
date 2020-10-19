"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapArrayToObject = void 0;
function mapArrayToObject(arr, callback) {
    const o = {};
    for (const [index, item] of arr.entries()) {
        const [key, value] = callback(item, index);
        o[key] = value;
    }
    return o;
}
exports.mapArrayToObject = mapArrayToObject;
