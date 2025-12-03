"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = requireAuth;
const jwt_1 = require("../lib/jwt");
if (!jwt_1.JWT_SECRET) {
    throw new Error('❌ JWT_SECRET is not defined in environment variables');
}
function requireAuth(req, res, next) {
    const header = req.header('Authorization');
    if (!header?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token tidak ditemukan' });
    }
    const decoded = (0, jwt_1.verifyToken)(header.split(' ')[1]);
    if (!decoded) {
        return res.status(401).json({ message: 'Token tidak valid' });
    }
    req.user = decoded;
    next();
}
