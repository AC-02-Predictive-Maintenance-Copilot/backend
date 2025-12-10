"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findLastTicket = exports.deleteTicketsByMachineId = exports.deleteTicketById = exports.updateTicket = exports.createTicket = exports.findTicketsByMachineId = exports.findTicketById = exports.findAllTickets = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const findAllTickets = async () => await prisma_1.default.ticket.findMany({ include: { machine: true }, orderBy: { createdAt: 'desc' } });
exports.findAllTickets = findAllTickets;
const findTicketById = async (ticketId) => await prisma_1.default.ticket.findUnique({
    where: { id: ticketId },
    include: { machine: true },
});
exports.findTicketById = findTicketById;
const findTicketsByMachineId = async (machineId) => await prisma_1.default.ticket.findMany({
    where: { machineId },
    include: { machine: true },
    orderBy: { createdAt: 'desc' },
});
exports.findTicketsByMachineId = findTicketsByMachineId;
const createTicket = async ({ id, ticketNumber, data }) => {
    const { productId, ...restData } = data;
    return prisma_1.default.ticket.create({
        data: {
            ...restData,
            id,
            ticketNumber,
            machine: {
                connect: { productId },
            },
        },
        include: {
            machine: true,
        },
    });
};
exports.createTicket = createTicket;
const updateTicket = async (ticketId, data) => {
    const { productId, ...restData } = data;
    return await prisma_1.default.ticket.update({
        where: { id: ticketId },
        data: {
            ...restData,
            machine: {
                connect: { productId },
            },
        },
        include: {
            machine: true,
        },
    });
};
exports.updateTicket = updateTicket;
const deleteTicketById = async (ticketId) => await prisma_1.default.ticket.delete({
    where: { id: ticketId },
});
exports.deleteTicketById = deleteTicketById;
const deleteTicketsByMachineId = async (machineId) => await prisma_1.default.ticket.deleteMany({
    where: { machineId },
});
exports.deleteTicketsByMachineId = deleteTicketsByMachineId;
const findLastTicket = async () => await prisma_1.default.ticket.findFirst({
    orderBy: { ticketNumber: 'desc' },
});
exports.findLastTicket = findLastTicket;
