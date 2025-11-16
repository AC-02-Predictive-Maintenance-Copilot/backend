import { Request, Response } from 'express';
import { errorRes, successRes } from '../../utils/response';
import { getAuthUserService, loginService, registerService } from './auth.service';
import { AuthRequest } from '../../middleware/auth';

export const registerHandler = async (req: Request, res: Response) => {
	const { name, username, email, password } = req.body;
	const user = await registerService({ name, username, email, password });
	return successRes({
		res,
		message: 'Registrasi berhasil',
		data: user,
		status: 201,
	});
};

export const loginHandler = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	const { user, token } = await loginService({ email, password });
	return successRes({
		res,
		message: 'Login berhasil',
		data: {
			token,
			user: { id: user.id, name: user.name, email: user.email },
		},
	});
};

export const getAuthUserHandler = async (req: AuthRequest, res: Response) => {
	if (!req.user) return errorRes({ res, message: 'User tidak ditemukan', status: 404 });
	const user = await getAuthUserService(req.user.id);
	return successRes({ res, data: { user } });
};
