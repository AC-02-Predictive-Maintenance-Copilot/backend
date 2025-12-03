import { z } from 'zod';

export type TMessageInput = z.infer<typeof messageSchema>;

export const messageSchema = z.object({
	content: z.string().min(1, 'Pesan tidak boleh kosong'),
});
