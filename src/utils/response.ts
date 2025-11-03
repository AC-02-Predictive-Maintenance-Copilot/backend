import { Response } from 'express';

export const successRes = (res: Response, message: string, data: any = null, status = 200) => {
	return res.status(status).json({ message, data });
};

export const errorRes = (res: Response, message: string, data: any = null, status = 400) => {
	return res.status(status).json({ message, data });
};
