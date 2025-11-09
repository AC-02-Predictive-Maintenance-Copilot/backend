import { Request, Response } from 'express';
import { successRes, errorRes } from '../../utils/response';
import { createMachine, findAllMachines } from './machine.repository';

export const getMachineHandler = async (_: Request, res: Response) => {
	try {
		const machine = await findAllMachines();
		return successRes({ res, data: machine });
	} catch (error: any) {
		console.error(error);
		return errorRes({ res, message: 'Terjadi kesalahan server', status: 500 });
	}
};

export const createMachineHandler = async (req: Request, res: Response) => {
	try {
		const { 
			productId,
			type,
			airTemperature,
			processTemperature,
			rotationalSpeed,
			torque,
			toolWear,
			target,
			failureType
		 } = req.body;
		await createMachine({ 
			productId,
			type,
			airTemperature,
			processTemperature,
			rotationalSpeed,
			torque,
			toolWear,
			target,
			failureType
		 });
		return successRes({ res, message: 'Berhasil menambahkan mesin baru' });
	} catch (error: any) {
		console.error(error);
		return errorRes({ res, message: 'Terjadi kesalahan server', status: 500 });
	}
};
