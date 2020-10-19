import { FAILED } from "../core/Result";
import { useHandler } from "./useHandler";

export function useSecureHandler(
  ...[router, path, getHandler]: Parameters<typeof useHandler>
) {
  useHandler(router, path, (req) => {
    if (!req.session.user) return () => ({ ...FAILED, reason: "NOT_ALLOWED" });
    return getHandler(req);
  });
}
