"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const overview_controller_1 = require("./overview.controller");
const router = (0, express_1.Router)();
router.get('/', overview_controller_1.getOverviewHandler);
exports.default = router;
