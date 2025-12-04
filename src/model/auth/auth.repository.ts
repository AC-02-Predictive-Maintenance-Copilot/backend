import prisma from '../../lib/prisma';
import { TRegisterInput } from './auth.validator';

const select = {
	id: true,
	name: true,
	username: true,
	email: true,
	role: true,
	isVerified: true,
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

export const findUserByUsername = async (username: string) =>
	await prisma.user.findUnique({
		where: { username },
		select,
	});

export const createUser = async (data: TRegisterInput) =>
	await prisma.user.create({
		data: {
			...data,
			isVerified: false,
		},
		select,
	});

export const findUserById = async (id: string) => await prisma.user.findUnique({ where: { id }, select: { name: true, email: true, role: true, isVerified: true } });
