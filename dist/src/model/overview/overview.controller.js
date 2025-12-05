"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOverviewHandler = void 0;
const response_1 = require("../../utils/response");
const overview_service_1 = require("./overview.service");
const client_1 = require("@prisma/client");
const getOverviewHandler = async (req, res) => {
    const isAdmin = req.user?.role === client_1.ERole.ADMIN;
    const overview = await (0, overview_service_1.getOverviewService)();
    const { users, ...overviewWithoutUsers } = overview;
    return (0, response_1.successRes)({ res, message: 'success', data: { overview: { ...(isAdmin ? overview : overviewWithoutUsers) } } });
};
exports.getOverviewHandler = getOverviewHandler;
