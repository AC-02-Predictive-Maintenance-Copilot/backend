import prisma from '../../lib/prisma';
import { TRegisterInput } from './auth.validator';

const select = {
	id: true,
	name: true,
	username: true,
	email: true,
	createdAt: true,
};

export const findUserByEmail = async (email: string) =>
	await prisma.user.findUnique({
		where: { email },
		select: {
			...select,
			password: true,
		},
	});

export const createUser = async (data: TRegisterInput) =>
	await prisma.user.create({
		data: {
			...data,
			isVerified: false,
		},
		select,
	});
