"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginNameLoader = void 0;
const TextLoader_1 = require("../../core/loaders/TextLoader");
exports.LoginNameLoader = () => TextLoader_1.TextLoader({
    minLength: 5,
    maxLength: 20,
});
