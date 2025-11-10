import { z } from 'zod';

export type TRegisterInput = z.infer<typeof registerSchema>;
export type TLoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
	name: z.string('Nama tidak valid').min(1, 'Nama tidak boleh kosong'),
	username: z.string('Username tidak valid').min(1, 'Username tidak boleh kosong'),
	email: z.string('Email tidak valid').email('Format email tidak valid'),
	password: z.string('Password tidak valid').min(6, 'Password minimal 6 karakter'),
});

export const loginSchema = z.object({
	email: z.string('Email tidak valid').email('Format email tidak valid'),
	password: z.string('Password tidak valid').min(6, 'Password minimal 6 karakter'),
});
