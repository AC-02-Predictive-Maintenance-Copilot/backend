"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMessageByIdHandler = exports.deleteAllMessagesHandler = exports.createMessageHandler = exports.getMessagesHandler = void 0;
const response_1 = require("../../utils/response");
const message_repository_1 = require("./message.repository");
const message_service_1 = require("./message.service");
const getMessagesHandler = async (req, res) => {
    const messages = await (0, message_repository_1.findAllMessages)(req.user.id);
    return (0, response_1.successRes)({ res, message: 'success', data: { messages } });
};
exports.getMessagesHandler = getMessagesHandler;
const createMessageHandler = async (req, res) => {
    const { content } = req.body;
    const message = await (0, message_service_1.createMessageService)(req.user.id, content);
    return (0, response_1.successRes)({ res, message: 'Berhasil menambahkan pesan baru', data: { message }, status: 201 });
};
exports.createMessageHandler = createMessageHandler;
const deleteAllMessagesHandler = async (req, res) => {
    const messages = await (0, message_repository_1.deleteAllMessages)(req.user.id);
    return (0, response_1.successRes)({ res, message: 'Data pesan berhasil dihapus', data: { messages } });
};
exports.deleteAllMessagesHandler = deleteAllMessagesHandler;
const deleteMessageByIdHandler = async (req, res) => {
    const { id } = req.params;
    const message = await (0, message_repository_1.deleteMessageById)(id);
    return (0, response_1.successRes)({ res, message: 'Data pesan berhasil dihapus', data: { message } });
};
exports.deleteMessageByIdHandler = deleteMessageByIdHandler;
