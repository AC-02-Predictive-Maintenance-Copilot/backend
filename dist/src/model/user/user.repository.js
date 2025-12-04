"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserById = exports.unverifyUser = exports.verifyUser = exports.findUserById = exports.findAllUsers = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../lib/prisma"));
const findAllUsers = async () => await prisma_1.default.user.findMany({ where: { role: client_1.ERole.ENGINEER } });
exports.findAllUsers = findAllUsers;
const findUserById = async (userId) => await prisma_1.default.user.findUnique({
    where: { id: userId },
});
exports.findUserById = findUserById;
const verifyUser = async (userId) => {
    return prisma_1.default.user.update({
        where: { id: userId },
        data: {
            isVerified: true,
        },
    });
};
exports.verifyUser = verifyUser;
const unverifyUser = async (userId) => {
    return prisma_1.default.user.update({
        where: { id: userId },
        data: {
            isVerified: false,
        },
    });
};
exports.unverifyUser = unverifyUser;
const deleteUserById = async (userId) => await prisma_1.default.user.delete({
    where: { id: userId },
});
exports.deleteUserById = deleteUserById;
