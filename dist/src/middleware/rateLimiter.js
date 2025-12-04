"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRateLimiter = void 0;
const express_rate_limit_1 = __importStar(require("express-rate-limit"));
const createRateLimiter = ({ windowMs, max, message = { message: 'Too many requests, please try again later.' }, keyGenerator, context = 'global', }) => {
    return (0, express_rate_limit_1.default)({
        windowMs,
        max,
        standardHeaders: true,
        legacyHeaders: false,
        keyGenerator: (req) => {
            try {
                if (keyGenerator)
                    return keyGenerator(req);
                return (0, express_rate_limit_1.ipKeyGenerator)(String(req.ip));
            }
            catch {
                return 'unknown';
            }
        },
        handler: (req, res) => {
            const key = keyGenerator ? keyGenerator(req) : (0, express_rate_limit_1.ipKeyGenerator)(String(req.ip));
            console.warn(`[RateLimit] ${context} | key=${key} | method=${req.method} | url=${req.originalUrl}`);
            res.status(429).json(message);
        },
    });
};
exports.createRateLimiter = createRateLimiter;
