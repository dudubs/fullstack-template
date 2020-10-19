import { AppRoutes } from "./AppRoutes";
import { LoginHandler } from "../server/handlers/LoginHandler";
import { RegisterHandler } from "../server/handlers/RegisterHandler";
import { UsersQueryHandler } from "../server/handlers/UsersQueryHandler";
import { Awaitable } from "../server/typings";

type Handler<D, R> = (...args) => (data: D) => Awaitable<R>;

type AnyHandler = Handler<any, any>;

type HandlerData<T extends AnyHandler> = T extends Handler<infer U, any>
  ? U
  : never;

type HandlerResult<T extends AnyHandler> = T extends Handler<any, infer U>
  ? U
  : never;

export type HandlerApi<T extends AnyHandler> = (
  data: HandlerData<T>
) => Promise<HandlerResult<T>>;

export function createAppConnection(
  post: (path: string, data: object) => Promise<any>
) {
  return {
    logout: () => post(AppRoutes.LOGOUT, {}),
    login: connectToHandler<typeof LoginHandler>(AppRoutes.LOGIN),
    register: connectToHandler<typeof RegisterHandler>(AppRoutes.REGISTER),
    getUsers: connectToHandler<typeof UsersQueryHandler>(AppRoutes.GET_USERS),
  };

  function connectToHandler<T extends AnyHandler>(path: string): HandlerApi<T> {
    return (data) => post(path, data);
  }
}
