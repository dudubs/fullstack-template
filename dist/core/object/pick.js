"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pick = void 0;
function pick(o, ...keys) {
    const no = {};
    for (let key of keys) {
        no[key] = o[key];
    }
    return no;
}
exports.pick = pick;
