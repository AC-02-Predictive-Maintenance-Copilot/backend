import { z } from 'zod';

export const paramsIdSchema = z.object({
	id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'ID tidak valid'),
});

export const paramsStatusIdSchema = z.object({
	statusId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'ID Status tidak valid'),
});
