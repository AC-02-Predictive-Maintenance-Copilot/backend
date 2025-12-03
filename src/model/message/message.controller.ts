import { Response } from 'express';
import { AuthRequest } from '../../middleware/auth';
import { successRes } from '../../utils/response';
import { deleteAllMessages, deleteMessageById, findAllMessages } from './message.repository';
import { createMessageService } from './message.service';

export const getMessagesHandler = async (req: AuthRequest, res: Response) => {
	const messages = await findAllMessages(req.user!.id);
	return successRes({ res, message: 'success', data: { messages } });
};

export const createMessageHandler = async (req: AuthRequest, res: Response) => {
	const { content } = req.body;
	const message = await createMessageService(req.user!.id, content);
	return successRes({ res, message: 'Berhasil menambahkan pesan baru', data: { message }, status: 201 });
};

export const deleteAllMessagesHandler = async (req: AuthRequest, res: Response) => {
	const messages = await deleteAllMessages(req.user!.id);
	return successRes({ res, message: 'Data pesan berhasil dihapus', data: { messages } });
};

export const deleteMessageByIdHandler = async (req: AuthRequest, res: Response) => {
	const { id } = req.params;
	const message = await deleteMessageById(id);
	return successRes({ res, message: 'Data pesan berhasil dihapus', data: { message } });
};
