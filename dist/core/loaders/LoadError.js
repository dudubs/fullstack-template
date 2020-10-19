"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadError = void 0;
class LoadError /* Not instanceof Error */ {
    constructor(error) {
        this.error = error;
    }
}
exports.LoadError = LoadError;
