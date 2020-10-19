"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniqueLoginNameLoader = void 0;
const rxjs_1 = require("rxjs");
const checkLoader_1 = require("../../core/loaders/operators/checkLoader");
const User_1 = require("../entities/User");
const UserRegisterHandler_1 = require("./UserRegisterHandler");
exports.UniqueLoginNameLoader = () => rxjs_1.pipe(UserRegisterHandler_1.LoginNameLoader(), checkLoader_1.checkLoader((loginName) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield User_1.User.count({ where: { loginName }, take: 1 })) {
        return "ALREADY_IN_USE";
    }
})));
