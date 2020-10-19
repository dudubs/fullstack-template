"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptPassword = void 0;
const crypto_1 = __importDefault(require("crypto"));
function encryptPassword(password) {
    const c = crypto_1.default.createHash("sha1");
    c.update(password);
    return c.digest("hex");
}
exports.encryptPassword = encryptPassword;
