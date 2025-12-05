"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOverviewService = void 0;
const overview_repository_1 = require("./overview.repository");
const getOverviewService = async () => {
    return await (0, overview_repository_1.getOverview)();
};
exports.getOverviewService = getOverviewService;
