"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadToPromise = void 0;
const rxjs_1 = require("rxjs");
const LoadError_1 = require("../LoadError");
function loadToPromise(loader, data) {
    return loader(rxjs_1.of(data))
        .toPromise()
        .catch((error) => {
        if (error instanceof LoadError_1.LoadError) {
            return { error: error.error };
        }
        throw error;
    });
}
exports.loadToPromise = loadToPromise;
