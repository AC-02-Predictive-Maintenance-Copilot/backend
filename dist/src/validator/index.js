"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paramsIdTicketSchema = exports.paramsStatusIdSchema = exports.paramsIdSchema = void 0;
const zod_1 = require("zod");
exports.paramsIdSchema = zod_1.z.object({
    id: zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/, 'ID tidak valid'),
});
exports.paramsStatusIdSchema = zod_1.z.object({
    statusId: zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/, 'ID Status tidak valid'),
});
exports.paramsIdTicketSchema = zod_1.z.object({
    id: zod_1.z.string().regex(/^TK-\d+$/, 'Format harus TK-angka'),
});
