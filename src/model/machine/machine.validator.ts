import { z } from 'zod';

export type TMachineInput = z.infer<typeof machineSchema>;

export const machineSchema = z.object({
	name: z.string().min(1, 'Nama tidak boleh kosong'),
});
