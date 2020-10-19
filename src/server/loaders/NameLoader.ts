import { TextLoader } from "../../core/loaders/TextLoader";

export const NameLoader = () => TextLoader({ minLength: 2, maxLength: 20 });
