import { Session } from "./entities/Session";
import { generateRandomToken } from "./utils/generateRandomToken";

export async function getSession({
  secretToken,
  updateSecretToken,
}: {
  secretToken: string;
  updateSecretToken(secretToken: string);
}): Promise<Session> {
  let session =
    (secretToken && (await Session.findOne({ where: { secretToken } }))) ||
    undefined;

  if (session) {
    return session;
  }

  session = await createSession();
  updateSecretToken(session.secretToken);
  return session;
}

export function createSession() {
  return Session.create({
    secretToken: generateRandomToken(),
    timeout: new Date().getTime(),
  }).save();
}
