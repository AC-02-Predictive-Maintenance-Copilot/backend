"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthUserHandler = exports.loginHandler = exports.registerHandler = void 0;
const response_1 = require("../../utils/response");
const auth_service_1 = require("./auth.service");
const registerHandler = async (req, res) => {
    const { name, username, email, password } = req.body;
    const user = await (0, auth_service_1.registerService)({ name, username, email, password });
    return (0, response_1.successRes)({
        res,
        message: 'Registrasi berhasil',
        data: user,
        status: 201,
    });
};
exports.registerHandler = registerHandler;
const loginHandler = async (req, res) => {
    const { email, password } = req.body;
    const { user, token, message } = await (0, auth_service_1.loginService)({ email, password });
    return (0, response_1.successRes)({
        res,
        message,
        data: {
            token,
            user,
        },
        status: !token ? 401 : 200,
    });
};
exports.loginHandler = loginHandler;
const getAuthUserHandler = async (req, res) => {
    if (!req.user)
        return (0, response_1.errorRes)({ res, message: 'User tidak ditemukan', status: 404 });
    const user = await (0, auth_service_1.getAuthUserService)(req.user.id);
    return (0, response_1.successRes)({ res, data: { user } });
};
exports.getAuthUserHandler = getAuthUserHandler;
