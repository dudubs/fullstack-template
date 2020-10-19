import cookieParser from "cookie-parser";
import express from "express";
import { SUCCESS } from "../core/Result";
import { AppRoutes } from "../common/AppRoutes";
import { User } from "./entities/User";
import { LoginHandler } from "./handlers/LoginHandler";
import { RegisterHandler } from "./handlers/RegisterHandler";
import { SessionToExpressHandler } from "./handlers/SessionToExpressHandler";
import { UsersQueryHandler } from "./handlers/UsersQueryHandler";
import { useSecureHandler } from "./useSecureHandler";
import { useUnsecureHandler } from "./useUnsecureHandler";

export function createAppRouter() {
  const router = express.Router();

  router.use(cookieParser());
  router.use(express.json());
  router.use(SessionToExpressHandler({ cookieName: "appId" }));

  buildRoutes();

  return router;

  function buildRoutes() {
    useUnsecureHandler(router, AppRoutes.LOGIN, async (req) =>
      LoginHandler({
        async onLogin(user: User) {
          req.session.user = user;
          await req.session.save();
        },
      })
    );

    useUnsecureHandler(router, AppRoutes.REGISTER, (req) =>
      RegisterHandler({
        async onRegister(user) {
          req.session.user = user;
          await req.session.save();
        },
      })
    );

    useSecureHandler(router, AppRoutes.LOGOUT, (req) => async () => {
      req.session.user = null;
      await req.session.save();
      return SUCCESS;
    });

    useSecureHandler(router, AppRoutes.GET_USERS, () => UsersQueryHandler());
  }
}
