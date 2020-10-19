import { FormHandler } from "../../core/FormHandler";
import { ObjectLoader } from "../../core/loaders/ObjectLoader";
import { TextLoader } from "../../core/loaders/TextLoader";
import { FAILED, SUCCESS } from "../../core/Result";
import { User } from "../entities/User";
import { Awaitable } from "../typings";
import { encryptPassword } from "../utils/encryptPassword";

export function LoginHandler({
  onLogin,
}: {
  onLogin(user: User): Awaitable<any>;
}) {
  return FormHandler(
    ObjectLoader({
      loginName: TextLoader(),
      password: TextLoader(),
    }),
    {
      async onSubmit({ loginName, password }) {
        const user = await User.findOne({
          where: { loginName, encrypedPassword: encryptPassword(password) },
        });
        if (user) {
          await onLogin(user);
          return { ...SUCCESS, helloTo: user.fullName };
        }
        return FAILED;
      },
    }
  );
}
