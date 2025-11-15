import { EPriority, EStatus } from '@prisma/client';
import { z } from 'zod';

export type TTicketInput = z.infer<typeof ticketSchema>;

export const ticketSchema = z.object({
	machineId: z.string().min(1, 'Machine Id tidak boleh kosong'),
	priority: z.enum(EPriority, 'Priority tidak valid'),
	status: z.enum(EStatus, 'Status tidak valid'),
	description: z.string().min(1, 'Description tidak boleh kosong'),
});
