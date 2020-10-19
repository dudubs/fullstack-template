import express from "express";
import { Awaitable } from "./typings";

export function useHandler(
  router: express.Router,
  path: string,
  getHandler: (req: express.Request) => Awaitable<(body: any) => any>
) {
  router.post(path, async (req, res, next) => {
    const handler = await getHandler(req);
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(await handler(req.body)));
  });
}
