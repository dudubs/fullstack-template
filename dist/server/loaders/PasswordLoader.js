"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordLoader = void 0;
const TextLoader_1 = require("../../core/loaders/TextLoader");
exports.PasswordLoader = () => TextLoader_1.TextLoader({
    minLength: 6,
    maxLength: 20,
});
