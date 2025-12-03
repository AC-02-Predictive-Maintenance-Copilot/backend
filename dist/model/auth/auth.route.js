"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_1 = require("../../middleware/validate");
const auth_validator_1 = require("./auth.validator");
const auth_controller_1 = require("./auth.controller");
const auth_limiter_1 = require("./auth.limiter");
const auth_1 = require("../../middleware/auth");
const rateLimiter_1 = require("../../middleware/rateLimiter");
const router = (0, express_1.Router)();
router.use((0, rateLimiter_1.createRateLimiter)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    context: 'auth',
}));
router.post('/register', (0, validate_1.validateBody)(auth_validator_1.registerSchema), auth_controller_1.registerHandler);
router.post('/login', auth_limiter_1.loginRateLimiter, (0, validate_1.validateBody)(auth_validator_1.loginSchema), auth_controller_1.loginHandler);
router.get('/me', auth_1.requireAuth, auth_controller_1.getAuthUserHandler);
exports.default = router;
