"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllowedOrigins = getAllowedOrigins;
function getAllowedOrigins() {
    const env = process.env.CORS_ORIGIN;
    if (!env || env === '*' || env.trim() === '') {
        return '*';
    }
    return env.split(',').map((o) => o.trim());
}
