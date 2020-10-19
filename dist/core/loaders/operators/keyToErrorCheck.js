"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keyToErrorCheck = void 0;
const hasKeys_1 = require("../../object/hasKeys");
const checkLoader_1 = require("./checkLoader");
function keyToErrorCheck(errorType) {
    return checkLoader_1.checkLoader((value) => {
        if (hasKeys_1.hasKeys(value.keyToError)) {
            return { type: errorType, keyToError: value.keyToError };
        }
    });
}
exports.keyToErrorCheck = keyToErrorCheck;
