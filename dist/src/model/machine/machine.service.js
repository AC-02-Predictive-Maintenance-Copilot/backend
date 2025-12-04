"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMachineService = exports.findMachineByProductIdService = exports.findMachineByIdService = void 0;
const httpError_1 = require("../../utils/httpError");
const ticket_repository_1 = require("../ticket/ticket.repository");
const machine_repository_1 = require("./machine.repository");
const findMachineByIdService = async (machineId) => {
    const machine = await (0, machine_repository_1.findMachineById)(machineId);
    if (!machine)
        throw new httpError_1.HttpError('Mesin tidak ditemukan', 404);
};
exports.findMachineByIdService = findMachineByIdService;
const findMachineByProductIdService = async (productId) => {
    const machine = await (0, machine_repository_1.findMachineByProductId)(productId);
    if (!machine)
        throw new httpError_1.HttpError('Mesin tidak ditemukan', 404);
};
exports.findMachineByProductIdService = findMachineByProductIdService;
const deleteMachineService = async ({ machineId }) => {
    await (0, exports.findMachineByIdService)(machineId);
    await (0, machine_repository_1.deleteStatusesByMachineId)(machineId);
    await (0, ticket_repository_1.deleteTicketsByMachineId)(machineId);
    return await (0, machine_repository_1.deleteMachine)(machineId);
};
exports.deleteMachineService = deleteMachineService;
