"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTicketService = exports.updateTicketService = exports.createTicketService = exports.findTicketsByMachineIdService = exports.findTicketByIdService = void 0;
const httpError_1 = require("../../utils/httpError");
const machine_service_1 = require("../machine/machine.service");
const ticket_repository_1 = require("./ticket.repository");
const findTicketByIdService = async (id) => {
    const ticket = await (0, ticket_repository_1.findTicketById)(id);
    if (!ticket) {
        throw new httpError_1.HttpError('Tiket tidak ditemukan', 404);
    }
    return ticket;
};
exports.findTicketByIdService = findTicketByIdService;
const findTicketsByMachineIdService = async (machineId) => {
    const ticket = await (0, ticket_repository_1.findTicketsByMachineId)(machineId);
    if (!ticket) {
        throw new httpError_1.HttpError('Tiket tidak ditemukan', 404);
    }
    return ticket;
};
exports.findTicketsByMachineIdService = findTicketsByMachineIdService;
const createTicketService = async ({ data }) => {
    const { productId, problem, priority, status, problemDetail, isPublished } = data;
    await (0, machine_service_1.findMachineByProductIdService)(productId);
    const lastTicket = await (0, ticket_repository_1.findLastTicket)();
    const nextNumber = (lastTicket?.ticketNumber || 0) + 1;
    const formattedId = `TK-${String(nextNumber).padStart(3, '0')}`;
    return await (0, ticket_repository_1.createTicket)({
        id: formattedId,
        ticketNumber: nextNumber,
        data: { productId, problem, priority, status, problemDetail, isPublished },
    });
};
exports.createTicketService = createTicketService;
const updateTicketService = async ({ ticketId, data }) => {
    const { productId, problem, priority, status, problemDetail, isPublished } = data;
    await (0, machine_service_1.findMachineByProductIdService)(productId);
    await (0, exports.findTicketByIdService)(ticketId);
    return await (0, ticket_repository_1.updateTicket)(ticketId, { productId, problem, priority, status, problemDetail, isPublished });
};
exports.updateTicketService = updateTicketService;
const deleteTicketService = async ({ ticketId }) => {
    await (0, exports.findTicketByIdService)(ticketId);
    return await (0, ticket_repository_1.deleteTicketById)(ticketId);
};
exports.deleteTicketService = deleteTicketService;
