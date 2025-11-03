import { ZodObject, ZodError } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { errorRes } from '../utils/response.js';

export const idRegExp = new RegExp('^[0-9a-fA-F]{24}$');

export const validate = (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
	try {
		schema.parse({
			body: req.body,
			query: req.query,
			params: req.params,
		});
		next();
	} catch (err) {
		if (err instanceof ZodError) {
			return errorRes(
				res,
				'Validation error',
				err.issues.map((e) => ({
					path: e.path.join('.'),
					message: e.message,
				})),
				400
			);
		}
		return errorRes(res, 'Unexpected validation middleware error', null, 500);
	}
};

type next = (req: Request, res: Response, id: string) => any;

export default function validateId(next: next): (req: Request, res: Response) => any {
	return (req: Request, res: Response) => {
		if (!(typeof req.params.id === 'string' && idRegExp.test(req.params.id))) {
			return errorRes(res, 'Required ID/Invalid ID', null, 403);
		}
		return next(req, res, req.params.id);
	};
}
