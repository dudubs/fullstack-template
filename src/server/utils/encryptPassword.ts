import crypto from "crypto";

export function encryptPassword(password: string): string {
  const c = crypto.createHash("sha1");
  c.update(password);
  return c.digest("hex");
}
