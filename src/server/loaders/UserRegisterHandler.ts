import { TextLoader } from "../../core/loaders/TextLoader";

export const LoginNameLoader = () =>
  TextLoader({
    minLength: 5,
    maxLength: 20,
  });
