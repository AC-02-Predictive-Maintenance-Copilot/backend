"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserById = exports.createUser = exports.findUserByUsername = exports.findUserByEmail = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const select = {
    id: true,
    name: true,
    username: true,
    email: true,
    role: true,
    isVerified: true,
    createdAt: true,
};
const findUserByEmail = async (email) => await prisma_1.default.user.findUnique({
    where: { email },
    select: {
        ...select,
        password: true,
    },
});
exports.findUserByEmail = findUserByEmail;
const findUserByUsername = async (username) => await prisma_1.default.user.findUnique({
    where: { username },
    select,
});
exports.findUserByUsername = findUserByUsername;
const createUser = async (data) => await prisma_1.default.user.create({
    data: {
        ...data,
        isVerified: false,
    },
    select,
});
exports.createUser = createUser;
const findUserById = async (id) => await prisma_1.default.user.findUnique({ where: { id }, select: { name: true, email: true, role: true } });
exports.findUserById = findUserById;
