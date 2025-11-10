import { Request, Response } from 'express';
import { successRes } from '../../utils/response';
import { loginService, registerService } from './auth.service';

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
