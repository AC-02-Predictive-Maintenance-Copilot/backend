"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const auth_route_1 = __importDefault(require("../model/auth/auth.route"));
const machine_route_1 = __importDefault(require("../model/machine/machine.route"));
const ticket_route_1 = __importDefault(require("../model/ticket/ticket.route"));
const message_route_1 = __importDefault(require("../model/message/message.route"));
const user_route_1 = __importDefault(require("../model/user/user.route"));
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/health', (_, res) => {
    res.json({ ok: true, ts: new Date().toISOString() });
});
router.use('/auth', auth_route_1.default);
router.use(auth_1.requireAuth);
router.use('/machines', machine_route_1.default);
router.use('/tickets', ticket_route_1.default);
router.use('/chat', message_route_1.default);
router.use('/users', user_route_1.default);
