"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapObject = void 0;
function mapObject(obj, callback) {
    const m = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            m[key] = callback(obj[key], key);
        }
    }
    return m;
}
exports.mapObject = mapObject;
