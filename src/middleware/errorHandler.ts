import { Request, Response, NextFunction } from 'express';

export interface AppError extends Error {
	status?: number;
}

export const errorHandler = (err: AppError, _req: Request, res: Response, _next: NextFunction) => {
	console.error(err.stack);

	return res.status(err.status || 500).json({
		message: err.message || 'Terjadi kesalahan server',
	});
};
