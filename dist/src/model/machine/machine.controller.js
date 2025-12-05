"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStatusHandler = exports.updateStatusHandler = exports.createStatusHandler = exports.getStatusByMachineIdHandler = exports.getStatusHandler = exports.checkMachineHandler = exports.deleteMachineHandler = exports.updateMachineHandler = exports.createMachineHandler = exports.getMachineByIdHandler = exports.getMachineHandler = void 0;
const response_1 = require("../../utils/response");
const machine_repository_1 = require("./machine.repository");
const machine_service_1 = require("./machine.service");
const getMachineHandler = async (_, res) => {
    const machines = await (0, machine_repository_1.findAllMachines)();
    return (0, response_1.successRes)({ res, message: 'success', data: { machines } });
};
exports.getMachineHandler = getMachineHandler;
const getMachineByIdHandler = async (req, res) => {
    const { id } = req.params;
    const machine = await (0, machine_service_1.findMachineByIdService)(id);
    return (0, response_1.successRes)({ res, message: 'success', data: { machine } });
};
exports.getMachineByIdHandler = getMachineByIdHandler;
const createMachineHandler = async (req, res) => {
    const { productId, name } = req.body;
    const machine = await (0, machine_repository_1.createMachine)({ productId, name });
    return (0, response_1.successRes)({ res, message: 'Berhasil menambahkan mesin baru', data: { machine }, status: 201 });
};
exports.createMachineHandler = createMachineHandler;
const updateMachineHandler = async (req, res) => {
    const { id } = req.params;
    const { productId, name } = req.body;
    const machine = await (0, machine_service_1.updateMachineService)(id, { productId, name });
    return (0, response_1.successRes)({ res, data: { machine }, message: 'Data mesin berhasil diperbarui' });
};
exports.updateMachineHandler = updateMachineHandler;
const deleteMachineHandler = async (req, res) => {
    const { id } = req.params;
    const machine = await (0, machine_service_1.deleteMachineService)({ machineId: id });
    return (0, response_1.successRes)({
        res,
        message: 'Data mesin berhasil dihapus',
        data: { machine },
    });
};
exports.deleteMachineHandler = deleteMachineHandler;
const checkMachineHandler = async (req, res) => {
    const { statusId } = req.params;
    const payload = req.body;
    const analysis = await (0, machine_service_1.checkMachineService)(statusId, payload);
    return (0, response_1.successRes)({ res, message: 'success', data: { analysis } });
};
exports.checkMachineHandler = checkMachineHandler;
// Handlers machine status
const getStatusHandler = async (_, res) => {
    const statuses = await (0, machine_repository_1.findAllStatus)();
    return (0, response_1.successRes)({ res, message: 'success', data: { statuses } });
};
exports.getStatusHandler = getStatusHandler;
const getStatusByMachineIdHandler = async (req, res) => {
    const { machineId } = req.params;
    const statuses = await (0, machine_service_1.findStatusByMachineIdService)(machineId);
    return (0, response_1.successRes)({ res, message: 'success', data: { statuses } });
};
exports.getStatusByMachineIdHandler = getStatusByMachineIdHandler;
const createStatusHandler = async (req, res) => {
    const { machineId, type, airTemperature, processTemperature, rotationalSpeed, torque, toolWear, target, failureType } = req.body;
    const { analysis, status } = await (0, machine_service_1.createStatusService)({
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
    return (0, response_1.successRes)({ res, message: 'Berhasil menambahkan status baru', data: { status, analysis }, status: 201 });
};
exports.createStatusHandler = createStatusHandler;
const updateStatusHandler = async (req, res) => {
    const { id } = req.params;
    const { machineId, type, airTemperature, processTemperature, rotationalSpeed, torque, toolWear, target, failureType } = req.body;
    const { analysis, status } = await (0, machine_service_1.updateStatusService)(id, {
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
    return (0, response_1.successRes)({ res, data: { status, analysis }, message: 'Data status berhasil diperbarui' });
};
exports.updateStatusHandler = updateStatusHandler;
const deleteStatusHandler = async (req, res) => {
    const { id } = req.params;
    const status = await (0, machine_service_1.deleteStatusService)(id);
    return (0, response_1.successRes)({
        res,
        message: 'Data status berhasil dihapus',
        data: { status },
    });
};
exports.deleteStatusHandler = deleteStatusHandler;
