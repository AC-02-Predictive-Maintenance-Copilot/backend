import { HttpError } from '../../utils/httpError';
import { findMachineByIdService } from '../machine/machine.service';
import { createTicket, deleteTicketById, findLastTicket, findTicketById, findTicketsByMachineId, updateTicket } from './ticket.repository';
import { TTicketInput } from './ticket.validator';

export const findTicketByIdService = async (id: string) => {
	const ticket = await findTicketById(id);
	if (!ticket) {
		throw new HttpError('Tiket tidak ditemukan', 404);
	}
	return ticket;
};

export const findTicketsByMachineIdService = async (machineId: string) => {
	const ticket = await findTicketsByMachineId(machineId);
	if (!ticket) {
		throw new HttpError('Tiket tidak ditemukan', 404);
	}
	return ticket;
};

export const createTicketService = async ({ data }: { data: TTicketInput }) => {
	const { machineId, problem, priority, status, problemDetail, isPublished } = data;
	await findMachineByIdService(machineId);

	const lastTicket = await findLastTicket();
	const nextNumber = (lastTicket?.ticketNumber || 0) + 1;
	const formattedId = `TK-${String(nextNumber).padStart(3, '0')}`;

	return await createTicket({
		id: formattedId,
		ticketNumber: nextNumber,
		data: { machineId, problem, priority, status, problemDetail, isPublished },
	});
};

export const updateTicketService = async ({ ticketId, data }: { ticketId: string; data: TTicketInput }) => {
	const { machineId, problem, priority, status, problemDetail, isPublished } = data;
	await findMachineByIdService(machineId);
	await findTicketByIdService(ticketId);
	return await updateTicket(ticketId, { machineId, problem, priority, status, problemDetail, isPublished });
};

export const deleteTicketService = async ({ ticketId }: { ticketId: string }) => {
	await findTicketByIdService(ticketId);
	return await deleteTicketById(ticketId);
};
