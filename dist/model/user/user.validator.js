"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ticketSchema = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
exports.ticketSchema = zod_1.z.object({
    productId: zod_1.z.string().min(1, 'Product Id tidak boleh kosong'),
    problem: zod_1.z.string().min(1, 'Problem tidak boleh kosong'),
    priority: zod_1.z.enum(client_1.EPriority, 'Priority tidak valid'),
    status: zod_1.z.enum(client_1.EStatus, 'Status tidak valid'),
    problemDetail: zod_1.z.string().min(1, 'Description tidak boleh kosong'),
    isPublished: zod_1.z.boolean().default(false),
});
