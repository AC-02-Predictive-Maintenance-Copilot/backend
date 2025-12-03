import { Request, Response } from 'express';
import { successRes } from '../../utils/response';
import { findAllTickets } from './ticket.repository';
import { createTicketService, deleteTicketService, findTicketByIdService, findTicketsByMachineIdService, updateTicketService } from './ticket.service';

export const getTicketHandler = async (_: Request, res: Response) => {
	const tickets = await findAllTickets();
	return successRes({ res, message: 'succses', data: { tickets } });
};

export const getTicketByIdHandler = async (req: Request, res: Response) => {
	const { id } = req.params;
	const ticket = await findTicketByIdService(id);
	return successRes({ res, message: 'succses', data: { ticket } });
};

export const getTicketByMachineIdHandler = async (req: Request, res: Response) => {
	const { machineId } = req.params;
	const tickets = await findTicketsByMachineIdService(machineId);
	return successRes({ res, message: 'succses', data: { tickets } });
};

export const createTicketHandler = async (req: Request, res: Response) => {
	const { productId, problem, priority, status, problemDetail, isPublished } = req.body;
	const ticket = await createTicketService({ data: { productId, problem, priority, status, problemDetail, isPublished } });
	return successRes({ res, message: 'Berhasil menambahkan tiket baru', data: { ticket }, status: 201 });
};

export const updateTicketHandler = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { productId, problem, priority, status, problemDetail, isPublished } = req.body;
	const ticket = await updateTicketService({ ticketId: id, data: { productId, problem, priority, status, problemDetail, isPublished } });
	return successRes({ res, data: { ticket }, message: 'Data tiket berhasil diperbarui' });
};

export const deleteTicketHandler = async (req: Request, res: Response) => {
	const { id } = req.params;
	const ticket = await deleteTicketService({ ticketId: id });
	return successRes({ res, message: 'Data tiket berhasil dihapus', data: { ticket } });
};
