import { ZodError, ZodTypeAny } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { errorRes } from '../utils/response';

export const idRegExp = new RegExp('^[0-9a-fA-F]{24}$');

export const validateBody = (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
	try {
		req.body = schema.parse(req.body);
		return next();
	} catch (err) {
		if (err instanceof ZodError) {
			return errorRes({
				res,
				message: 'Validation error',
				errors: err.issues.map((e) => ({
					path: e.path.join('.'),
					message: e.message,
				})),
				status: 400,
			});
		}
		return errorRes({ res, message: 'Unexpected validation error', status: 500 });
	}
};

export const validateParams = (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
	try {
		req.params = schema.parse(req.params) as any;
		return next();
	} catch (err) {
		if (err instanceof ZodError) {
			return errorRes({
				res,
				message: 'Validation error',
				errors: err.issues.map((e) => ({
					path: e.path.join('.'),
					message: e.message,
				})),
				status: 400,
			});
		}
		return errorRes({ res, message: 'Unexpected validation error', status: 500 });
	}
};

type next = (req: Request, res: Response, id: string) => any;

export default function validateId(next: next): (req: Request, res: Response) => any {
	return (req: Request, res: Response) => {
		if (!(typeof req.params.id === 'string' && idRegExp.test(req.params.id))) {
			return errorRes({
				res,
				message: 'Required ID/Invalid ID',
				status: 403,
			});
		}
		return next(req, res, req.params.id);
	};
}
