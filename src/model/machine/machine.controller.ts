import { Request, Response } from 'express';
import { successRes, errorRes } from '../../utils/response';
import { 
	createMachine,
	findMachineById,
	findAllMachines,
	updateMachine,
	deleteMachine
} from './machine.repository';

export const getMachineHandler = async (_: Request, res: Response) => {
	try {
		const machine = await findAllMachines();
		return successRes({ res, data: machine });
	} catch (error: any) {
		console.error(error);
		return errorRes({ res, message: 'Terjadi kesalahan server', status: 500 });
	}
};

export const getMachineByIdHandler = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const machine = await findMachineById(id);
		if (!machine) {
			return errorRes({ res, message: 'Mesin tidak ditemukan', status: 404 });
		}
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

export const updateMachineHandler = async (req: Request, res: Response) => {
  	try {
		const { id } = req.params;
		const {
			productId,
			type,
			airTemperature,
			processTemperature,
			rotationalSpeed,
			torque,
			toolWear,
			target,
			failureType,
		} = req.body;
		// Cek apakah mesin dengan ID tersebut ada
		const existing = await findMachineById(id);
		if (!existing) {
			return errorRes({ res, message: "Mesin tidak ditemukan", status: 404 });
		}

		const updatedMachine = await updateMachine(id, {
			productId,
			type,
			airTemperature,
			processTemperature,
			rotationalSpeed,
			torque,
			toolWear,
			target,
			failureType,
		});
		return successRes({res, data: updatedMachine, message: "Data mesin berhasil diupdate", });
	} catch (error: any) {
		console.error(error);
		return errorRes({
			res,
			message: "Terjadi kesalahan server",
			status: 500,
		});
	}
};

export const deleteMachineHandler = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		// Cek apakah mesin ada
		const existing = await findMachineById(id);
		if (!existing) {
		return errorRes({ res, message: "Mesin tidak ditemukan", status: 404 });
		}

		await deleteMachine(id);

		return successRes({
		res,
		message: "Data mesin berhasil dihapus",
		});
	} catch (error: any) {
		console.error(error);
		return errorRes({
		res,
		message: "Terjadi kesalahan server",
		status: 500,
		});
	}
};