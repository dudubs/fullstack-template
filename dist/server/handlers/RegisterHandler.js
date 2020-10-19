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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterHandler = void 0;
const FormHandler_1 = require("../../core/FormHandler");
const ObjectLoader_1 = require("../../core/loaders/ObjectLoader");
const Result_1 = require("../../core/Result");
const User_1 = require("../entities/User");
const encryptPassword_1 = require("../utils/encryptPassword");
const NameLoader_1 = require("../loaders/NameLoader");
const PasswordLoader_1 = require("../loaders/PasswordLoader");
const UniqueLoginNameLoader_1 = require("../loaders/UniqueLoginNameLoader");
function RegisterHandler({ onRegister, }) {
    return FormHandler_1.FormHandler(ObjectLoader_1.ObjectLoader({
        loginName: UniqueLoginNameLoader_1.UniqueLoginNameLoader(),
        password: PasswordLoader_1.PasswordLoader(),
        firstName: NameLoader_1.NameLoader(),
        lastName: NameLoader_1.NameLoader(),
    }), {
        onSubmit(_a) {
            var { password } = _a, userData = __rest(_a, ["password"]);
            return __awaiter(this, void 0, void 0, function* () {
                const user = yield User_1.User.create(Object.assign(Object.assign({}, userData), { encrypedPassword: encryptPassword_1.encryptPassword(password) })).save();
                yield onRegister(user);
                return Result_1.SUCCESS;
            });
        },
    });
}
exports.RegisterHandler = RegisterHandler;
