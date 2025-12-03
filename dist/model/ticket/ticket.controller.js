"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTicketHandler = exports.updateTicketHandler = exports.createTicketHandler = exports.getTicketByMachineIdHandler = exports.getTicketByIdHandler = exports.getTicketHandler = void 0;
const response_1 = require("../../utils/response");
const ticket_repository_1 = require("./ticket.repository");
const ticket_service_1 = require("./ticket.service");
const getTicketHandler = async (_, res) => {
    const tickets = await (0, ticket_repository_1.findAllTickets)();
    return (0, response_1.successRes)({ res, message: 'success', data: { tickets } });
};
exports.getTicketHandler = getTicketHandler;
const getTicketByIdHandler = async (req, res) => {
    const { id } = req.params;
    const ticket = await (0, ticket_service_1.findTicketByIdService)(id);
    return (0, response_1.successRes)({ res, message: 'success', data: { ticket } });
};
exports.getTicketByIdHandler = getTicketByIdHandler;
const getTicketByMachineIdHandler = async (req, res) => {
    const { machineId } = req.params;
    const tickets = await (0, ticket_service_1.findTicketsByMachineIdService)(machineId);
    return (0, response_1.successRes)({ res, message: 'success', data: { tickets } });
};
exports.getTicketByMachineIdHandler = getTicketByMachineIdHandler;
const createTicketHandler = async (req, res) => {
    const { productId, problem, priority, status, problemDetail, isPublished } = req.body;
    const ticket = await (0, ticket_service_1.createTicketService)({ data: { productId, problem, priority, status, problemDetail, isPublished } });
    return (0, response_1.successRes)({ res, message: 'Berhasil menambahkan tiket baru', data: { ticket }, status: 201 });
};
exports.createTicketHandler = createTicketHandler;
const updateTicketHandler = async (req, res) => {
    const { id } = req.params;
    const { productId, problem, priority, status, problemDetail, isPublished } = req.body;
    const ticket = await (0, ticket_service_1.updateTicketService)({ ticketId: id, data: { productId, problem, priority, status, problemDetail, isPublished } });
    return (0, response_1.successRes)({ res, data: { ticket }, message: 'Data tiket berhasil diperbarui' });
};
exports.updateTicketHandler = updateTicketHandler;
const deleteTicketHandler = async (req, res) => {
    const { id } = req.params;
    const ticket = await (0, ticket_service_1.deleteTicketService)({ ticketId: id });
    return (0, response_1.successRes)({ res, message: 'Data tiket berhasil dihapus', data: { ticket } });
};
exports.deleteTicketHandler = deleteTicketHandler;
