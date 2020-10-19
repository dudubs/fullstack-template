import express from "express";
import { Session } from "../entities/Session";
import { getSession } from "../getSession";

declare global {
  namespace Express {
    interface Request {
      session: Session;
    }
  }
}

export function SessionToExpressHandler({ cookieName }): express.Handler {
  return async (req, res, next) => {
    req.session = await getSession({
      secretToken: req.cookies[cookieName],
      updateSecretToken(secretToken: string) {
        res.cookie(cookieName, secretToken);
      },
    });
    next();
  };
}
