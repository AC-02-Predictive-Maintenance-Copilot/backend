"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthUserService = exports.loginService = exports.registerService = void 0;
const bcrypt_1 = require("../../lib/bcrypt");
const auth_repository_1 = require("./auth.repository");
const jwt_1 = require("../../lib/jwt");
const httpError_1 = require("../../utils/httpError");
const registerService = async ({ name, username, email, password }) => {
    const existingEmail = await (0, auth_repository_1.findUserByEmail)(email);
    if (existingEmail) {
        throw new httpError_1.HttpError('Email sudah terdaftar', 409);
    }
    const existingUsername = await (0, auth_repository_1.findUserByUsername)(username);
    if (existingUsername) {
        throw new httpError_1.HttpError('Username sudah terdaftar', 409);
    }
    const hashed = await (0, bcrypt_1.hashPassword)({ password });
    return await (0, auth_repository_1.createUser)({ name, username, email, password: hashed });
};
exports.registerService = registerService;
const loginService = async ({ email, password }) => {
    const user = await (0, auth_repository_1.findUserByEmail)(email);
    if (!user || !user.password) {
        throw new httpError_1.HttpError('Email tidak ditemukan', 401);
    }
    const match = await (0, bcrypt_1.comparePassword)({ password, hash: user.password });
    if (!match) {
        throw new httpError_1.HttpError('Password salah', 401);
    }
    const token = (0, jwt_1.signToken)({ id: user.id, email: user.email });
    return {
        user: {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
        },
        token,
    };
};
exports.loginService = loginService;
const getAuthUserService = async (id) => {
    const user = await (0, auth_repository_1.findUserById)(id);
    if (!user)
        throw new httpError_1.HttpError('User tidak ditemukan', 404);
    return user;
};
exports.getAuthUserService = getAuthUserService;
