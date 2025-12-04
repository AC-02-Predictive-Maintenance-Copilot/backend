"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    name: zod_1.z.string('Nama tidak valid').min(1, 'Nama tidak boleh kosong'),
    username: zod_1.z.string('Username tidak valid').min(1, 'Username tidak boleh kosong'),
    email: zod_1.z.string('Email tidak valid').email('Format email tidak valid'),
    password: zod_1.z.string('Password tidak valid').min(6, 'Password minimal 6 karakter'),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string('Email tidak valid').email('Format email tidak valid'),
    password: zod_1.z.string('Password tidak valid').min(6, 'Password minimal 6 karakter'),
});
