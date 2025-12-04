"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMessageById = exports.deleteAllMessages = exports.createMessage = exports.findAllMessages = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const findAllMessages = async (userId) => (await prisma_1.default.message.findMany({
    where: {
        userId,
    },
    include: {
        user: {
            select: { id: true, name: true, email: true },
        },
    },
    take: 100,
    orderBy: { createdAt: 'desc' },
})).reverse();
exports.findAllMessages = findAllMessages;
const createMessage = async ({ userId, role, data }) => {
    return prisma_1.default.message.create({
        data: {
            ...data,
            role,
            user: {
                connect: { id: userId },
            },
        },
        include: {
            user: {
                select: { id: true, name: true, email: true },
            },
        },
    });
};
exports.createMessage = createMessage;
const deleteAllMessages = async (userId) => await prisma_1.default.message.deleteMany({
    where: { userId },
});
exports.deleteAllMessages = deleteAllMessages;
const deleteMessageById = async (messageId) => await prisma_1.default.message.delete({
    where: { id: messageId },
});
exports.deleteMessageById = deleteMessageById;
