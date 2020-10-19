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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAppRouter = void 0;
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const Result_1 = require("../core/Result");
const AppRoutes_1 = require("../common/AppRoutes");
const LoginHandler_1 = require("./handlers/LoginHandler");
const RegisterHandler_1 = require("./handlers/RegisterHandler");
const SessionToExpressHandler_1 = require("./handlers/SessionToExpressHandler");
const UsersQueryHandler_1 = require("./handlers/UsersQueryHandler");
const useSecureHandler_1 = require("./useSecureHandler");
const useUnsecureHandler_1 = require("./useUnsecureHandler");
function createAppRouter() {
    const router = express_1.default.Router();
    router.use(cookie_parser_1.default());
    router.use(express_1.default.json());
    router.use(SessionToExpressHandler_1.SessionToExpressHandler({ cookieName: "appId" }));
    buildRoutes();
    return router;
    function buildRoutes() {
        useUnsecureHandler_1.useUnsecureHandler(router, AppRoutes_1.AppRoutes.LOGIN, (req) => __awaiter(this, void 0, void 0, function* () {
            return LoginHandler_1.LoginHandler({
                onLogin(user) {
                    return __awaiter(this, void 0, void 0, function* () {
                        req.session.user = user;
                        yield req.session.save();
                    });
                },
            });
        }));
        useUnsecureHandler_1.useUnsecureHandler(router, AppRoutes_1.AppRoutes.REGISTER, (req) => RegisterHandler_1.RegisterHandler({
            onRegister(user) {
                return __awaiter(this, void 0, void 0, function* () {
                    req.session.user = user;
                    yield req.session.save();
                });
            },
        }));
        useSecureHandler_1.useSecureHandler(router, AppRoutes_1.AppRoutes.LOGOUT, (req) => () => __awaiter(this, void 0, void 0, function* () {
            req.session.user = null;
            yield req.session.save();
            return Result_1.SUCCESS;
        }));
        useSecureHandler_1.useSecureHandler(router, AppRoutes_1.AppRoutes.GET_USERS, () => UsersQueryHandler_1.UsersQueryHandler());
    }
}
exports.createAppRouter = createAppRouter;
