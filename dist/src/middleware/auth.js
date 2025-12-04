"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = requireAuth;
exports.requireAdmin = requireAdmin;
const jwt_1 = require("../lib/jwt");
const client_1 = require("@prisma/client");
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
function requireAdmin(req, res, next) {
    if (req.user?.role !== client_1.ERole.ADMIN) {
        return res.status(403).json({ message: 'Akses ditolak: Admin saja' });
    }
    next();
}
