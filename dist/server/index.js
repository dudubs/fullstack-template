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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = require("fs");
const typeorm_1 = require("typeorm");
const createAppRouter_1 = require("./createAppRouter");
const Session_1 = require("./entities/Session");
const User_1 = require("./entities/User");
const reload_1 = __importDefault(require("reload"));
const app = express_1.default();
reload_1.default(app).then(reload => {
    fs_1.watch('./bundle', () => {
        reload();
    });
});
app.use('/bundle', express_1.default.static("bundle"));
app.use('/', (req, res, next) => {
    res.setHeader('Content-Type', 'text/html');
    res.send(`<html>
<head>
<script src="/bundle/vendor.js"></script>
<script src="/bundle/browser.js"></script>
<script src="/bundle/runtime.js"></script>
<script src="/reload/reload.js"></script>

</head>
<body>
<div id="app" />
</body>
</html>`);
});
app.use(createAppRouter_1.createAppRouter());
if (module === require.main)
    (() => __awaiter(void 0, void 0, void 0, function* () {
        yield Promise.all([
            // listen to server
            new Promise((resolve, reject) => {
                app.listen(8080, "0.0.0.0", () => {
                    resolve();
                });
            }).catch((becauseServer) => {
                throw { becauseServer };
            }),
            // connect to dabase
            typeorm_1.createConnection({
                type: "sqlite",
                name: "default",
                database: "db.sqlite3",
                synchronize: true,
                entities: [User_1.User, Session_1.Session],
            }).catch((becauseConnection) => {
                throw { becauseConnection };
            }),
        ]).catch((error) => {
            console.error(error);
        });
    }))();
