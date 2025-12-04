import { Request, Response } from 'express';
import { successRes } from '../../utils/response';
import { findAllUsers } from './user.repository';
import { deleteUserService, findUserByIdService, unverifyUserService, verifyUserService } from './user.service';

export const getAllUsersHandler = async (_: Request, res: Response) => {
	const users = await findAllUsers();
	return successRes({ res, message: 'success', data: { users } });
};

export const getUserByIdHandler = async (req: Request, res: Response) => {
	const { id } = req.params;
	const user = await findUserByIdService(id);
	return successRes({ res, message: 'success', data: { user } });
};

export const verifyUserHandler = async (req: Request, res: Response) => {
	const { id } = req.params;
	const user = await verifyUserService(id);
	return successRes({ res, message: 'Berhasil memverifikasi pengguna', data: { user } });
};

export const unverifyUserHandler = async (req: Request, res: Response) => {
	const { id } = req.params;
	const user = await unverifyUserService(id);
	return successRes({ res, message: 'Berhasil membatalkan verifikasi pengguna', data: { user } });
};

export const deleteUserHandler = async (req: Request, res: Response) => {
	const { id } = req.params;
	const user = await deleteUserService(id);
	return successRes({ res, message: 'Data pengguna berhasil dihapus', data: { user } });
};
