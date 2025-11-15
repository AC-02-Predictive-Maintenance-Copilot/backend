import prisma from '../../lib/prisma';
import { TTicketInput } from './ticket.validator';

export const findAllTickets = async () => await prisma.ticket.findMany({});

export const findTicketById = async (ticketId: string) =>
	await prisma.ticket.findUnique({
		where: { id: ticketId },
	});

export const findTicketsByMachineId = async (machineId: string) =>
	await prisma.ticket.findMany({
		where: { machineId },
	});

export const createTicket = async (data: TTicketInput) => await prisma.ticket.create({ data });

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
