import prisma from '../../lib/prisma';
import { TTicketInput } from './ticket.validator';

export const findAllTickets = async () => await prisma.ticket.findMany({ include: { machine: true } });

export const findTicketById = async (ticketId: string) =>
	await prisma.ticket.findUnique({
		where: { id: ticketId },
		include: { machine: true },
	});

export const findTicketsByMachineId = async (machineId: string) =>
	await prisma.ticket.findMany({
		where: { machineId },
		include: { machine: true },
	});

export const createTicket = async ({ id, ticketNumber, data }: { id: string; ticketNumber: number; data: TTicketInput }) => {
	return await prisma.ticket.create({ data: { ...data, id, ticketNumber } });
};

export const updateTicket = async (ticketId: string, data: TTicketInput) =>
	await prisma.ticket.update({
		where: { id: ticketId },
		data,
	});

export const deleteTicketById = async (ticketId: string) =>
	await prisma.ticket.delete({
		where: { id: ticketId },
	});

export const deleteTicketsByMachineId = async (machineId: string) =>
	await prisma.ticket.deleteMany({
		where: { machineId },
	});

export const findLastTicket = async () =>
	await prisma.ticket.findFirst({
		orderBy: { ticketNumber: 'desc' },
	});
