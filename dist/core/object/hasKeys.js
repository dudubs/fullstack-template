"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasKeys = void 0;
function hasKeys(obj) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            return true;
        }
    }
    return false;
}
exports.hasKeys = hasKeys;
