"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = requireAuth;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_1 = require("../lib/jwt");
if (!jwt_1.JWT_SECRET) {
    throw new Error('❌ JWT_SECRET is not defined in environment variables');
}
function requireAuth(req, res, next) {
    const header = req.header('Authorization');
    if (!header?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token tidak ditemukan' });
    }
    const token = header.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, jwt_1.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch {
        return res.status(401).json({ message: 'Token tidak valid' });
    }
}
