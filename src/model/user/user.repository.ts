import { ERole } from '@prisma/client';
import prisma from '../../lib/prisma';

export const findAllUsers = async () => await prisma.user.findMany({ where: { role: ERole.ENGINEER } });

export const findUserById = async (userId: string) =>
	await prisma.user.findUnique({
		where: { id: userId },
	});

export const verifyUser = async (userId: string) => {
	return prisma.user.update({
		where: { id: userId },
		data: {
			isVerified: true,
		},
	});
};

export const unverifyUser = async (userId: string) => {
	return prisma.user.update({
		where: { id: userId },
		data: {
			isVerified: false,
		},
	});
};

export const deleteUserById = async (userId: string) =>
	await prisma.user.delete({
		where: { id: userId },
	});
