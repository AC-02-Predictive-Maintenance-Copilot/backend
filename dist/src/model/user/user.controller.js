"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserHandler = exports.unverifyUserHandler = exports.verifyUserHandler = exports.getUserByIdHandler = exports.getAllUsersHandler = void 0;
const response_1 = require("../../utils/response");
const user_repository_1 = require("./user.repository");
const user_service_1 = require("./user.service");
const getAllUsersHandler = async (_, res) => {
    const users = await (0, user_repository_1.findAllUsers)();
    return (0, response_1.successRes)({ res, message: 'success', data: { users } });
};
exports.getAllUsersHandler = getAllUsersHandler;
const getUserByIdHandler = async (req, res) => {
    const { id } = req.params;
    const user = await (0, user_service_1.findUserByIdService)(id);
    return (0, response_1.successRes)({ res, message: 'success', data: { user } });
};
exports.getUserByIdHandler = getUserByIdHandler;
const verifyUserHandler = async (req, res) => {
    const { id } = req.params;
    const user = await (0, user_service_1.verifyUserService)(id);
    return (0, response_1.successRes)({ res, message: 'Berhasil memverifikasi pengguna', data: { user } });
};
exports.verifyUserHandler = verifyUserHandler;
const unverifyUserHandler = async (req, res) => {
    const { id } = req.params;
    const user = await (0, user_service_1.unverifyUserService)(id);
    return (0, response_1.successRes)({ res, message: 'Berhasil membatalkan verifikasi pengguna', data: { user } });
};
exports.unverifyUserHandler = unverifyUserHandler;
const deleteUserHandler = async (req, res) => {
    const { id } = req.params;
    const user = await (0, user_service_1.deleteUserService)(id);
    return (0, response_1.successRes)({ res, message: 'Data pengguna berhasil dihapus', data: { user } });
};
exports.deleteUserHandler = deleteUserHandler;
