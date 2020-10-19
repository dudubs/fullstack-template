import exp from "constants";
import express from "express";
import * as http from "http";
import { Awaitable, Awaited } from "../typings";

const TEST_PORT = 7777;
const TEST_ADDR = "0.0.0.0";
const TEST_URL = `http://${TEST_ADDR}:${TEST_PORT}`;
const app = express();

let server: http.Server;
beforeAll(async () => {
  await new Promise((resolve) => {
    server = app.listen(TEST_PORT, TEST_ADDR, () => resolve());
  });
});

app.use((...args) => {
  return currentHandler(...args);
});

afterAll(() => {
  server.close();
});

afterEach(() => {
  currentHandler = noHandler;
});

let currentHandler: express.Handler;

function noHandler() {
  fail(`No handler`);
}

export namespace ExpressTester {
  export function getUrl(path: string = "/") {
    return TEST_URL + path;
  }

  export function setHandler(handler: express.Handler) {
    currentHandler = handler;
  }
  export async function testHandler<T>(
    handler: express.Handler,
    context: (url: string) => Awaitable<T>
  ): Promise<T> {
    let result;
    setHandler(handler);
    return context(TEST_URL);
  }
}
