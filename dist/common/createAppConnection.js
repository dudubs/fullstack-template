"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAppConnection = void 0;
const AppRoutes_1 = require("./AppRoutes");
function createAppConnection(post) {
    return {
        logout: () => post(AppRoutes_1.AppRoutes.LOGOUT, {}),
        login: connectToHandler(AppRoutes_1.AppRoutes.LOGIN),
        register: connectToHandler(AppRoutes_1.AppRoutes.REGISTER),
        getUsers: connectToHandler(AppRoutes_1.AppRoutes.GET_USERS),
    };
    function connectToHandler(path) {
        return (data) => post(path, data);
    }
}
exports.createAppConnection = createAppConnection;
