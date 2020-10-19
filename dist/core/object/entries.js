"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entries = void 0;
function* entries(obj) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            yield [key, obj[key]];
        }
    }
}
exports.entries = entries;
