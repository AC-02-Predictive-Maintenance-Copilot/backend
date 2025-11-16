import { comparePassword, hashPassword } from '../../lib/bcrypt';
import { createUser, findUserByEmail, findUserById, findUserByUsername } from './auth.repository';
import { signToken } from '../../lib/jwt';
import { HttpError } from '../../utils/httpError';

export const registerService = async ({ name, username, email, password }: { name: string; username: string; email: string; password: string }) => {
	const existingEmail = await findUserByEmail(email);
	if (existingEmail) {
		throw new HttpError('Email sudah terdaftar', 409);
	}

	const existingUsername = await findUserByUsername(email);
	if (existingUsername) {
		throw new HttpError('Username sudah terdaftar', 409);
	}

	const hashed = await hashPassword({ password });

	return await createUser({ name, username, email, password: hashed });
};

export const loginService = async ({ email, password }: { email: string; password: string }) => {
	const user = await findUserByEmail(email);

	if (!user || !user.password) {
		throw new HttpError('Email tidak ditemukan', 401);
	}

	const match = await comparePassword({ password, hash: user.password });

	if (!match) {
		throw new HttpError('Password salah', 401);
	}

	const token = signToken({ id: user.id, email: user.email });

	return {
		user: {
			id: user.id,
			name: user.name,
			username: user.username,
			email: user.email,
			createdAt: user.createdAt,
		},
		token,
	};
};

export const getAuthUserService = async (id: string) => {
	return await findUserById(id);
};
