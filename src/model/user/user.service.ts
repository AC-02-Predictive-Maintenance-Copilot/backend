import { HttpError } from '../../utils/httpError';
import { deleteAllMessages } from '../message/message.repository';
import { deleteUserById, findUserById, unverifyUser, verifyUser } from './user.repository';

export const findUserByIdService = async (id: string) => {
	const user = await findUserById(id);
	if (!user) {
		throw new HttpError('Pengguna tidak ditemukan', 404);
	}
	return user;
};

export const verifyUserService = async (userId: string) => {
	await findUserByIdService(userId);
	return await verifyUser(userId);
};

export const unverifyUserService = async (userId: string) => {
	await findUserByIdService(userId);
	return await unverifyUser(userId);
};

export const deleteUserService = async (userId: string) => {
	await findUserByIdService(userId);
	await deleteAllMessages(userId);
	return await deleteUserById(userId);
};
