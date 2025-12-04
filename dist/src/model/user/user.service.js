"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserService = exports.unverifyUserService = exports.verifyUserService = exports.findUserByIdService = void 0;
const httpError_1 = require("../../utils/httpError");
const user_repository_1 = require("./user.repository");
const findUserByIdService = async (id) => {
    const user = await (0, user_repository_1.findUserById)(id);
    if (!user) {
        throw new httpError_1.HttpError('Pengguna tidak ditemukan', 404);
    }
    return user;
};
exports.findUserByIdService = findUserByIdService;
const verifyUserService = async (userId) => {
    await (0, exports.findUserByIdService)(userId);
    return await (0, user_repository_1.verifyUser)(userId);
};
exports.verifyUserService = verifyUserService;
const unverifyUserService = async (userId) => {
    await (0, exports.findUserByIdService)(userId);
    return await (0, user_repository_1.unverifyUser)(userId);
};
exports.unverifyUserService = unverifyUserService;
const deleteUserService = async (userId) => {
    await (0, exports.findUserByIdService)(userId);
    return await (0, user_repository_1.deleteUserById)(userId);
};
exports.deleteUserService = deleteUserService;
