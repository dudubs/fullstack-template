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
exports.LoginHandler = void 0;
const FormHandler_1 = require("../../core/FormHandler");
const ObjectLoader_1 = require("../../core/loaders/ObjectLoader");
const TextLoader_1 = require("../../core/loaders/TextLoader");
const Result_1 = require("../../core/Result");
const User_1 = require("../entities/User");
const encryptPassword_1 = require("../utils/encryptPassword");
function LoginHandler({ onLogin, }) {
    return FormHandler_1.FormHandler(ObjectLoader_1.ObjectLoader({
        loginName: TextLoader_1.TextLoader(),
        password: TextLoader_1.TextLoader(),
    }), {
        onSubmit({ loginName, password }) {
            return __awaiter(this, void 0, void 0, function* () {
                const user = yield User_1.User.findOne({
                    where: { loginName, encrypedPassword: encryptPassword_1.encryptPassword(password) },
                });
                if (user) {
                    yield onLogin(user);
                    return Object.assign(Object.assign({}, Result_1.SUCCESS), { helloTo: user.fullName });
                }
                return Result_1.FAILED;
            });
        },
    });
}
exports.LoginHandler = LoginHandler;
