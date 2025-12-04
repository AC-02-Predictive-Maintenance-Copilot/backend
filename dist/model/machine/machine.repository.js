"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStatusesByMachineId = exports.deleteStatus = exports.updateStatus = exports.createStatus = exports.findStatusById = exports.findStatusByMachineId = exports.findAllStatus = exports.saveMachineAnalysis = exports.deleteMachine = exports.updateMachine = exports.createMachine = exports.findMachineByProductId = exports.findMachineById = exports.findAllMachinesWithRelations = exports.findAllMachines = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const findAllMachines = async () => await prisma_1.default.machine.findMany({});
exports.findAllMachines = findAllMachines;
const findAllMachinesWithRelations = async () => await prisma_1.default.machine.findMany({
    include: {
        statuses: {
            include: {
                machineAnalysis: true,
            },
        },
        tickets: true,
    },
});
exports.findAllMachinesWithRelations = findAllMachinesWithRelations;
const findMachineById = async (id) => await prisma_1.default.machine.findUnique({
    where: { id },
    include: { statuses: true },
});
exports.findMachineById = findMachineById;
const findMachineByProductId = async (productId) => await prisma_1.default.machine.findUnique({
    where: { productId },
});
exports.findMachineByProductId = findMachineByProductId;
const createMachine = async (data) => await prisma_1.default.machine.create({ data });
exports.createMachine = createMachine;
const updateMachine = async (id, data) => await prisma_1.default.machine.update({
    where: { id },
    data,
});
exports.updateMachine = updateMachine;
const deleteMachine = async (id) => await prisma_1.default.machine.delete({
    where: { id },
});
exports.deleteMachine = deleteMachine;
const saveMachineAnalysis = async ({ statusId, diagnosis, agentMessage }) => {
    return prisma_1.default.machineAnalysis.create({
        data: {
            healthScore: diagnosis.health_score,
            riskProbability: diagnosis.risk_probability,
            status: diagnosis.status,
            diagnosis: diagnosis.diagnosis,
            isAnomaly: diagnosis.is_anomaly,
            llmPrompt: diagnosis.llm_prompt,
            llmResponse: agentMessage,
            machineStatus: { connect: { id: statusId } },
        },
    });
};
exports.saveMachineAnalysis = saveMachineAnalysis;
// Repository machine status
const findAllStatus = async () => await prisma_1.default.machineStatus.findMany({});
exports.findAllStatus = findAllStatus;
const findStatusByMachineId = async (machineId) => await prisma_1.default.machineStatus.findMany({
    where: { machineId },
    orderBy: { recordedAt: 'desc' },
});
exports.findStatusByMachineId = findStatusByMachineId;
const findStatusById = async (id) => await prisma_1.default.machineStatus.findUnique({
    where: { id },
});
exports.findStatusById = findStatusById;
const createStatus = async (data) => await prisma_1.default.machineStatus.create({ data });
exports.createStatus = createStatus;
const updateStatus = async (id, data) => await prisma_1.default.machineStatus.update({
    where: { id },
    data,
});
exports.updateStatus = updateStatus;
const deleteStatus = async (id) => await prisma_1.default.machineStatus.delete({
    where: { id },
});
exports.deleteStatus = deleteStatus;
const deleteStatusesByMachineId = async (machineId) => await prisma_1.default.machineStatus.deleteMany({
    where: { machineId },
});
exports.deleteStatusesByMachineId = deleteStatusesByMachineId;
