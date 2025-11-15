import { z } from 'zod';

export type TMachineInput = z.infer<typeof machineSchema>;
export type TStatusInput = z.infer<typeof statusSchema>;

export const machineSchema = z.object({
	productId: z.string().min(1, 'Product Id tidak boleh kosong'),
	name: z.string().min(1, 'Name tidak boleh kosong'),
});

export const statusSchema = z.object({
	machineId: z.string().min(1, 'Machine Id tidak boleh kosong'),
	type: z.string().min(1, 'Type tidak boleh kosong'),
	airTemperature: z.number().min(1, 'Air Temperature tidak boleh kosong'),
	processTemperature: z.number().min(1, 'Process Temperature tidak boleh kosong'),
	rotationalSpeed: z.number().min(1, 'Rotational Speed tidak boleh kosong'),
	torque: z.number().min(1, 'Torque tidak boleh kosong'),
	toolWear: z.number().min(1, 'Tool Wear tidak boleh kosong'),
	target: z.number().min(0, 'Target tidak boleh kosong'),
	failureType: z.string().optional().nullable(),
});
