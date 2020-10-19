import { TextLoader } from "../../core/loaders/TextLoader";

export const PasswordLoader = () =>
  TextLoader({
    minLength: 6,
    maxLength: 20,
  });
