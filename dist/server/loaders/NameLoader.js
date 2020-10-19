"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NameLoader = void 0;
const TextLoader_1 = require("../../core/loaders/TextLoader");
exports.NameLoader = () => TextLoader_1.TextLoader({ minLength: 2, maxLength: 20 });
