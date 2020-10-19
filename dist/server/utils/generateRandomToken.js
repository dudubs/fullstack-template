"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomToken = void 0;
const crypto_1 = __importDefault(require("crypto"));
function generateRandomToken() {
    return crypto_1.default.randomBytes(32).toString("base64");
}
exports.generateRandomToken = generateRandomToken;
