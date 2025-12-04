import prisma from '../../lib/prisma';
import { TTicketInput } from './user.validator';

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
	const { productId, ...restData } = data;
	return prisma.ticket.create({
		data: {
			...restData,
			id,
			ticketNumber,
			machine: {
				connect: { productId },
			},
		},
		include: {
			machine: true,
		},
	});
};

export const updateTicket = async (ticketId: string, data: TTicketInput) => {
	const { productId, ...restData } = data;
	return await prisma.ticket.update({
		where: { id: ticketId },
		data: {
			...restData,
			machine: {
				connect: { productId },
			},
		},
		include: {
			machine: true,
		},
	});
};

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
