"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateParams = exports.validateBody = exports.idRegExp = void 0;
exports.default = validateId;
const zod_1 = require("zod");
const response_1 = require("../utils/response");
exports.idRegExp = new RegExp('^[0-9a-fA-F]{24}$');
const validateBody = (schema) => (req, res, next) => {
    try {
        req.body = schema.parse(req.body);
        return next();
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            return (0, response_1.errorRes)({
                res,
                message: 'Validation error',
                errors: err.issues.map((e) => ({
                    path: e.path.join('.'),
                    message: e.message,
                })),
                status: 400,
            });
        }
        return (0, response_1.errorRes)({ res, message: 'Unexpected validation error', status: 500 });
    }
};
exports.validateBody = validateBody;
const validateParams = (schema) => (req, res, next) => {
    try {
        req.params = schema.parse(req.params);
        return next();
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            return (0, response_1.errorRes)({
                res,
                message: 'Validation error',
                errors: err.issues.map((e) => ({
                    path: e.path.join('.'),
                    message: e.message,
                })),
                status: 400,
            });
        }
        return (0, response_1.errorRes)({ res, message: 'Unexpected validation error', status: 500 });
    }
};
exports.validateParams = validateParams;
function validateId(next) {
    return (req, res) => {
        if (!(typeof req.params.id === 'string' && exports.idRegExp.test(req.params.id))) {
            return (0, response_1.errorRes)({
                res,
                message: 'Required ID/Invalid ID',
                status: 403,
            });
        }
        return next(req, res, req.params.id);
    };
}
