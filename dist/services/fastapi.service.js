"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkMachineWithFastAPI = exports.FASTAPI_URL = void 0;
const axios_1 = __importDefault(require("axios"));
exports.FASTAPI_URL = process.env.FASTAPI_URL;
if (!exports.FASTAPI_URL) {
    throw new Error('❌ FASTAPI_URL is not defined in environment variables');
}
const checkMachineWithFastAPI = async (payload) => {
    const { data } = await axios_1.default.post(exports.FASTAPI_URL, payload, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        },
    });
    return data;
};
exports.checkMachineWithFastAPI = checkMachineWithFastAPI;
