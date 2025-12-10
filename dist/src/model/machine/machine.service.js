"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStatusService = exports.updateStatusService = exports.createStatusService = exports.findStatusByMachineIdService = exports.findStatusByIdService = exports.deleteMachineService = exports.checkMachineService = exports.updateMachineService = exports.findMachineByProductIdService = exports.findMachineByIdService = void 0;
const agent_service_1 = require("../../services/agent.service");
const fastapi_service_1 = require("../../services/fastapi.service");
const httpError_1 = require("../../utils/httpError");
const ticket_repository_1 = require("../ticket/ticket.repository");
const machine_repository_1 = require("./machine.repository");
const findMachineByIdService = async (machineId) => {
    const machine = await (0, machine_repository_1.findMachineById)(machineId);
    if (!machine)
        throw new httpError_1.HttpError('Mesin tidak ditemukan', 404);
    return machine;
};
exports.findMachineByIdService = findMachineByIdService;
const findMachineByProductIdService = async (productId) => {
    const machine = await (0, machine_repository_1.findMachineByProductId)(productId);
    if (!machine)
        throw new httpError_1.HttpError('Mesin tidak ditemukan', 404);
    return machine;
};
exports.findMachineByProductIdService = findMachineByProductIdService;
const updateMachineService = async (machineId, data) => {
    await (0, exports.findMachineByIdService)(machineId);
    return await (0, machine_repository_1.updateMachine)(machineId, data);
};
exports.updateMachineService = updateMachineService;
const checkMachineService = async (statusId, payload) => {
    const diagnosis = await (0, fastapi_service_1.checkMachineWithFastAPI)(payload);
    const agentMessage = await (0, agent_service_1.generateAgentResponse)(diagnosis.llm_prompt);
    if (!agentMessage) {
        throw new httpError_1.HttpError('Gagal menghasilkan analisis dari AI', 500);
    }
    const analysis = await (0, machine_repository_1.saveMachineAnalysis)({
        statusId,
        diagnosis,
        agentMessage,
    });
    return analysis;
};
exports.checkMachineService = checkMachineService;
const deleteMachineService = async ({ machineId }) => {
    await (0, exports.findMachineByIdService)(machineId);
    await (0, machine_repository_1.deleteStatusesByMachineId)(machineId);
    await (0, ticket_repository_1.deleteTicketsByMachineId)(machineId);
    return await (0, machine_repository_1.deleteMachine)(machineId);
};
exports.deleteMachineService = deleteMachineService;
const findStatusByIdService = async (statusId) => {
    const status = await (0, machine_repository_1.findStatusById)(statusId);
    if (!status) {
        throw new httpError_1.HttpError('Status tidak ditemukan', 404);
    }
    return status;
};
exports.findStatusByIdService = findStatusByIdService;
const findStatusByMachineIdService = async (machineId) => {
    const statuses = await (0, machine_repository_1.findStatusByMachineId)(machineId);
    if (!statuses) {
        throw new httpError_1.HttpError('Status mesin tidak ditemukan', 404);
    }
    return statuses;
};
exports.findStatusByMachineIdService = findStatusByMachineIdService;
const createStatusService = async (data) => {
    const { machineId, type, airTemperature, processTemperature, rotationalSpeed, torque, toolWear, target, failureType } = data;
    await (0, exports.findMachineByIdService)(machineId);
    const status = await (0, machine_repository_1.createStatus)({
        machineId,
        type,
        airTemperature,
        processTemperature,
        rotationalSpeed,
        torque,
        toolWear,
        target,
        failureType,
    });
    const analysis = await (0, exports.checkMachineService)(status.id, {
        air_temp: airTemperature,
        process_temp: processTemperature,
        rpm: rotationalSpeed,
        torque,
        tool_wear: toolWear,
        type,
    });
    return { analysis, status };
};
exports.createStatusService = createStatusService;
const updateStatusService = async (statusId, data) => {
    const { machineId, type, airTemperature, processTemperature, rotationalSpeed, torque, toolWear, target, failureType } = data;
    await (0, exports.findMachineByIdService)(machineId);
    await (0, exports.findStatusByIdService)(statusId);
    const status = await (0, machine_repository_1.updateStatus)(statusId, {
        machineId,
        type,
        airTemperature,
        processTemperature,
        rotationalSpeed,
        torque,
        toolWear,
        target,
        failureType,
    });
    const analysis = await (0, exports.checkMachineService)(status.id, {
        air_temp: airTemperature,
        process_temp: processTemperature,
        rpm: rotationalSpeed,
        torque,
        tool_wear: toolWear,
        type,
    });
    return { analysis, status };
};
exports.updateStatusService = updateStatusService;
const deleteStatusService = async (statusId) => {
    await (0, exports.findStatusByIdService)(statusId);
    await (0, machine_repository_1.deleteAnalysis)(statusId);
    return await (0, machine_repository_1.deleteStatus)(statusId);
};
exports.deleteStatusService = deleteStatusService;
