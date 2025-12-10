import { ERole } from '@prisma/client';
import prisma from '../../lib/prisma';

const userSelect = {
	id: true,
	name: true,
	username: true,
	email: true,
	isVerified: true,
	role: true,
	picture: true,
	createdAt: true,
	updatedAt: true,
};

export const findAllUsers = async () => await prisma.user.findMany({ where: { role: ERole.ENGINEER }, select: userSelect, orderBy: { createdAt: 'desc' } });

export const findUserById = async (userId: string) =>
	await prisma.user.findUnique({
		where: { id: userId, role: ERole.ENGINEER },
		select: userSelect,
	});

export const verifyUser = async (userId: string) => {
	return prisma.user.update({
		where: { id: userId, role: ERole.ENGINEER },
		data: {
			isVerified: true,
		},
		select: userSelect,
	});
};

export const unverifyUser = async (userId: string) => {
	return prisma.user.update({
		where: { id: userId, role: ERole.ENGINEER },
		data: {
			isVerified: false,
		},
		select: userSelect,
	});
};

export const deleteUserById = async (userId: string) =>
	await prisma.user.delete({
		where: { id: userId, role: ERole.ENGINEER },
		select: userSelect,
	});
