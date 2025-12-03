import { Prisma } from '@prisma/client';
import { z } from 'zod';

export type TMachineInput = z.infer<typeof machineSchema>;
export type TStatusInput = z.infer<typeof statusSchema>;
export type TCheckMachine = z.infer<typeof checkMachineSchema>;
export type TMachineWithRelations = Prisma.MachineGetPayload<{
	include: {
		statuses: {
			include: {
				machineAnalysis: true;
			};
		};
		tickets: true;
	};
}>;

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

export const checkMachineSchema = z.object({
	air_temp: z.number().min(200, 'air_temp minimal 200 K').max(500, 'air_temp maksimal 500 K'),
	process_temp: z.number().min(200).max(700),
	rpm: z.number().min(0).max(3000),
	torque: z.number().min(0).max(200),
	tool_wear: z.number().min(0).max(300),
	type: z.enum(['L', 'M', 'H']),
});
