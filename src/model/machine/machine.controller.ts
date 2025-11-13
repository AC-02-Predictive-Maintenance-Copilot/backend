import e, { Request, Response } from 'express';
import { successRes, errorRes } from '../../utils/response';
import { 
	createMachine,
	findMachineById,
	findAllMachines,
	updateMachine,
	deleteMachine,

	findAllStatus,
	findStatusByMachineId,
	createStatus,
	updateStatus,
	deleteStatus,
	findStatusById
} from './machine.repository';
import { machine } from 'os';

export const getMachineHandler = async (_: Request, res: Response) => {
	try {
		const machine = await findAllMachines();
		return successRes({ res, message: 'succses', data: machine });
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
		return successRes({ res, message: 'succses', data: machine });
	} catch (error: any) {
		console.error(error);
		return errorRes({ res, message: 'Terjadi kesalahan server', status: 500 });
	}
};

export const createMachineHandler = async (req: Request, res: Response) => {
	try {
		const { 
			productId,
			name
		} = req.body;
		await createMachine({ 
			productId,
			name
		});
		return successRes({ res, message: 'Berhasil menambahkan mesin baru', data: machine, });
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
			name
		} = req.body;
		// Cek apakah mesin dengan ID tersebut ada
		const existing = await findMachineById(id);
		if (!existing) {
			return errorRes({ res, message: "Mesin tidak ditemukan", status: 404 });
		}

		const updatedMachine = await updateMachine(id, {
			productId,
			name
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
		message: "Data mesin berhasil dihapus", data: machine,
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

// Handlers machine status
export const getStatusHandler = async (_: Request, res: Response) => {
	try {
		const machine = await findAllStatus();
		return successRes({ res, message: 'succses', data: machine });
	} catch (error: any) {
		console.error(error);
		return errorRes({ res, message: 'Terjadi kesalahan server', status: 500 });
	}
};

export const getStatusByMachineIdHandler = async (req: Request, res: Response) => {
	try {
		const { machineId } = req.params;
		const machine = await findStatusByMachineId(machineId);
		if (!machine) {
			return errorRes({ res, message: 'Mesin tidak ditemukan', status: 404 });
		}
		return successRes({ res, message: 'succses', data: machine });
	} catch (error: any) {
		console.error(error);
		return errorRes({ res, message: 'Terjadi kesalahan server', status: 500 });
	}
};

export const createStatusHandler = async (req: Request, res: Response) => {
	try {
		const { 
			machineId,
			type,
			airTemperature,
			processTemperature,
			rotationalSpeed,
			torque,
			toolWear,
			target,
			failureType
		} = req.body;
		await createStatus({ 
			machineId,
			type,
			airTemperature,
			processTemperature,
			rotationalSpeed,
			torque,
			toolWear,
			target,
			failureType
		});
		return successRes({ res, message: 'Berhasil menambahkan Status baru', data: machine, });
	} catch (error: any) {
		console.error(error);
		return errorRes({ res, message: 'Terjadi kesalahan server', status: 500 });
	}
};

export const updateStatusHandler = async (req: Request, res: Response) => {
  	try {
		const { id } = req.params;
		const {
			machineId,
			type,
			airTemperature,
			processTemperature,
			rotationalSpeed,
			torque,
			toolWear,
			target,
			failureType
		} = req.body;
		// Cek apakah status dengan ID tersebut ada
		const existing = await findStatusById(id);
		if (!existing) {
			return errorRes({ res, message: "Status tidak ditemukan", status: 404 });
		}

		const updatedStatus = await updateStatus(id, {
			machineId,
			type,
			airTemperature,
			processTemperature,
			rotationalSpeed,
			torque,
			toolWear,
			target,
			failureType
		});
		return successRes({res, data: updatedStatus, message: "Data Status berhasil diupdate", });
	} catch (error: any) {
		console.error(error);
		return errorRes({
			res,
			message: "Terjadi kesalahan server",
			status: 500,
		});
	}
};

export const deleteStatusHandler = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		// Cek apakah status ada
		const existing = await findStatusById(id);
		if (!existing) {
		return errorRes({ res, message: "Status tidak ditemukan", status: 404 });
		}

		await deleteStatus(id);

		return successRes({
		res,
		message: "Data Status berhasil dihapus", data: machine,
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