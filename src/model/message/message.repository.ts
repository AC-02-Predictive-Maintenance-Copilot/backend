import { EMessageRole } from '@prisma/client';
import prisma from '../../lib/prisma';
import { TMessageInput } from './message.validator';

export const findAllMessages = async (userId: string) =>
	(
		await prisma.message.findMany({
			where: {
				userId,
			},
			include: {
				user: {
					select: { id: true, name: true, email: true },
				},
			},
			take: 100,
			orderBy: { createdAt: 'desc' },
		})
	).reverse();

export const createMessage = async ({ userId, role, data }: { userId: string; role: EMessageRole; data: Omit<TMessageInput, 'context'> }) => {
	return prisma.message.create({
		data: {
			...data,
			role,
			user: {
				connect: { id: userId },
			},
		},
		include: {
			user: {
				select: { id: true, name: true, email: true },
			},
		},
	});
};

export const deleteAllMessages = async (userId: string) =>
	await prisma.message.deleteMany({
		where: { userId },
	});

export const deleteMessageById = async (messageId: string) =>
	await prisma.message.delete({
		where: { id: messageId },
	});
