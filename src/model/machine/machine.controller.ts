import { Request, Response } from 'express';
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
	findStatusById,
} from './machine.repository';
import { deleteMachineService } from './machine.service';

export const getMachineHandler = async (_: Request, res: Response) => {
	const machines = await findAllMachines();
	return successRes({ res, message: 'success', data: { machines } });
};

export const getMachineByIdHandler = async (req: Request, res: Response) => {
	const { id } = req.params;
	const machine = await findMachineById(id);
	if (!machine) {
		return errorRes({ res, message: 'Mesin tidak ditemukan', status: 404 });
	}
	return successRes({ res, message: 'success', data: { machine } });
};

export const createMachineHandler = async (req: Request, res: Response) => {
	const { productId, name } = req.body;
	const machine = await createMachine({
		productId,
		name,
	});
	return successRes({ res, message: 'Berhasil menambahkan mesin baru', data: { machine }, status: 201 });
};

export const updateMachineHandler = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { productId, name } = req.body;

	const existing = await findMachineById(id);
	if (!existing) {
		return errorRes({ res, message: 'Mesin tidak ditemukan', status: 404 });
	}

	const machine = await updateMachine(id, {
		productId,
		name,
	});
	return successRes({ res, data: { machine }, message: 'Data mesin berhasil diperbarui' });
};

export const deleteMachineHandler = async (req: Request, res: Response) => {
	const { id } = req.params;

	const machine = await deleteMachineService({ machineId: id });

	return successRes({
		res,
		message: 'Data mesin berhasil dihapus',
		data: { machine },
	});
};

// Handlers machine status
export const getStatusHandler = async (_: Request, res: Response) => {
	const statuses = await findAllStatus();
	return successRes({ res, message: 'success', data: { statuses } });
};

export const getStatusByMachineIdHandler = async (req: Request, res: Response) => {
	const { machineId } = req.params;
	const statuses = await findStatusByMachineId(machineId);
	if (!statuses) {
		return errorRes({ res, message: 'Status mesin tidak ditemukan', status: 404 });
	}
	return successRes({ res, message: 'success', data: { statuses } });
};

export const createStatusHandler = async (req: Request, res: Response) => {
	const { machineId, type, airTemperature, processTemperature, rotationalSpeed, torque, toolWear, target, failureType } = req.body;

	const machine = await findMachineById(machineId);
	if (!machine) {
		return errorRes({ res, message: 'Mesin tidak ditemukan', status: 404 });
	}

	const status = await createStatus({
		machineId,
		type,
		airTemperature,
		processTemperature,
		rotationalSpeed,
		torque,
		toolWear,
		target,
		failureType,
	});

	return successRes({ res, message: 'Berhasil menambahkan status baru', data: { status }, status: 201 });
};

export const updateStatusHandler = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { machineId, type, airTemperature, processTemperature, rotationalSpeed, torque, toolWear, target, failureType } = req.body;

	const machine = await findMachineById(machineId);
	if (!machine) {
		return errorRes({ res, message: 'Mesin tidak ditemukan', status: 404 });
	}

	const existing = await findStatusById(id);
	if (!existing) {
		return errorRes({ res, message: 'Status tidak ditemukan', status: 404 });
	}

	const status = await updateStatus(id, {
		machineId,
		type,
		airTemperature,
		processTemperature,
		rotationalSpeed,
		torque,
		toolWear,
		target,
		failureType,
	});

	return successRes({ res, data: { status }, message: 'Data status berhasil diperbarui' });
};

export const deleteStatusHandler = async (req: Request, res: Response) => {
	const { id } = req.params;

	const existing = await findStatusById(id);
	if (!existing) {
		return errorRes({ res, message: 'Status tidak ditemukan', status: 404 });
	}

	const status = await deleteStatus(id);

	return successRes({
		res,
		message: 'Data status berhasil dihapus',
		data: { status },
	});
};
