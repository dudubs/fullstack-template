import { FormHandler } from "../../core/FormHandler";
import { ObjectLoader } from "../../core/loaders/ObjectLoader";
import { SUCCESS } from "../../core/Result";
import { User } from "../entities/User";
import { Awaitable } from "../typings";
import { encryptPassword } from "../utils/encryptPassword";
import { NameLoader } from "../loaders/NameLoader";
import { PasswordLoader } from "../loaders/PasswordLoader";
import { UniqueLoginNameLoader } from "../loaders/UniqueLoginNameLoader";

export function RegisterHandler({
  onRegister,
}: {
  onRegister(user: User): Awaitable;
}) {
  return FormHandler(
    ObjectLoader({
      loginName: UniqueLoginNameLoader(),
      password: PasswordLoader(),
      firstName: NameLoader(),
      lastName: NameLoader(),
    }),
    {
      async onSubmit({
        password,
        ...userData
      }: {
        loginName: string;
        password: string;
        firstName: string;
        lastName: string;
      }) {
        const user = await User.create({
          ...userData,
          encrypedPassword: encryptPassword(password),
        }).save();
        await onRegister(user);
        return SUCCESS;
      },
    }
  );
}
