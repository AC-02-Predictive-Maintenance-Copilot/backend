"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const index_1 = require("./routes/index");
const errorHandler_1 = require("./middleware/errorHandler");
const app = (0, express_1.default)();
const port = process.env.PORT;
app.set('trust proxy', true);
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({ origin: process.env.CORS_ORIGIN?.split(',') || true }));
app.use(express_1.default.json({ limit: '1mb' }));
app.use((0, morgan_1.default)('dev'));
app.use('/api/v1', index_1.router);
app.use((req, res) => {
    res.status(404).json({
        message: 'Route tidak ditemukan',
        method: req.method,
        path: req.originalUrl,
    });
});
app.use(errorHandler_1.errorHandler);
app.listen(port, () => console.log(`🚀 Server ready on http://localhost:${port}`));
