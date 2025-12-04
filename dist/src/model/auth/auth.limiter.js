"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRateLimiter = void 0;
const rateLimiter_1 = require("../../middleware/rateLimiter");
exports.loginRateLimiter = (0, rateLimiter_1.createRateLimiter)({
    windowMs: 60000,
    max: 5,
    context: 'login',
    message: { message: 'Terlalu banyak percobaan login. Coba lagi nanti.' },
    keyGenerator: (req) => String(req.body?.email || req.ip),
});
