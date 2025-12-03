"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkMachineSchema = exports.statusSchema = exports.machineSchema = void 0;
const zod_1 = require("zod");
exports.machineSchema = zod_1.z.object({
    productId: zod_1.z.string().min(1, 'Product Id tidak boleh kosong'),
    name: zod_1.z.string().min(1, 'Name tidak boleh kosong'),
});
exports.statusSchema = zod_1.z.object({
    machineId: zod_1.z.string().min(1, 'Machine Id tidak boleh kosong'),
    type: zod_1.z.string().min(1, 'Type tidak boleh kosong'),
    airTemperature: zod_1.z.number().min(1, 'Air Temperature tidak boleh kosong'),
    processTemperature: zod_1.z.number().min(1, 'Process Temperature tidak boleh kosong'),
    rotationalSpeed: zod_1.z.number().min(1, 'Rotational Speed tidak boleh kosong'),
    torque: zod_1.z.number().min(1, 'Torque tidak boleh kosong'),
    toolWear: zod_1.z.number().min(1, 'Tool Wear tidak boleh kosong'),
    target: zod_1.z.number().min(0, 'Target tidak boleh kosong'),
    failureType: zod_1.z.string().optional().nullable(),
});
exports.checkMachineSchema = zod_1.z.object({
    air_temp: zod_1.z.number().min(200, 'air_temp minimal 200 K').max(500, 'air_temp maksimal 500 K'),
    process_temp: zod_1.z.number().min(200).max(700),
    rpm: zod_1.z.number().min(0).max(3000),
    torque: zod_1.z.number().min(0).max(200),
    tool_wear: zod_1.z.number().min(0).max(300),
    type: zod_1.z.enum(['L', 'M', 'H']),
});
