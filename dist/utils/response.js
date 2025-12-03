"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorRes = exports.successRes = void 0;
const successRes = ({ res, message = null, data = null, status = 200 }) => {
    return res.status(status).json({ message, data });
};
exports.successRes = successRes;
const errorRes = ({ res, message = null, errors = null, status = 400 }) => {
    return res.status(status).json({ message, ...(errors ? { errors } : {}) });
};
exports.errorRes = errorRes;
