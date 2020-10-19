import { pipe } from "rxjs";
import { checkLoader } from "../../core/loaders/operators/checkLoader";
import { User } from "../entities/User";
import { LoginNameLoader } from "./UserRegisterHandler";

export const UniqueLoginNameLoader = () =>
  pipe(
    LoginNameLoader(),
    checkLoader(async (loginName) => {
      if (await User.count({ where: { loginName }, take: 1 })) {
        return "ALREADY_IN_USE";
      }
    })
  );
