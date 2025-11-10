import { Response } from 'express';

interface IRes {
	res: Response;
	message?: string | null;
	data?: any;
	status?: number;
	errors?: any;
}

export const successRes = ({ res, message = null, data = null, status = 200 }: IRes) => {
	return res.status(status).json({ message, data });
};

export const errorRes = ({ res, message = null, errors = null, status = 400 }: IRes) => {
	return res.status(status).json({ message, ...(errors ? { errors } : {}) });
};
