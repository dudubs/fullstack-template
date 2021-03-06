"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUnsecureHandler = void 0;
const Result_1 = require("../core/Result");
const useHandler_1 = require("./useHandler");
function useUnsecureHandler(...[router, path, getHandler]) {
    useHandler_1.useHandler(router, path, (req) => {
        if (req.session.user)
            return () => (Object.assign(Object.assign({}, Result_1.FAILED), { reason: "NOT_ALLOWED" }));
        return getHandler(req);
    });
}
exports.useUnsecureHandler = useUnsecureHandler;
