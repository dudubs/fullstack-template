"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useHandler = void 0;
function useHandler(router, path, getHandler) {
    router.post(path, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        const handler = yield getHandler(req);
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(yield handler(req.body)));
    }));
}
exports.useHandler = useHandler;
