import { Request, Response } from 'express';
import { successRes } from '../../utils/response';
import { createMachine, findAllMachines, findAllStatus } from './machine.repository';
import {
	checkMachineService,
	createStatusService,
	deleteMachineService,
	deleteStatusService,
	findMachineByIdService,
	findStatusByMachineIdService,
	updateMachineService,
	updateStatusService,
} from './machine.service';

export const getMachineHandler = async (_: Request, res: Response) => {
	const machines = await findAllMachines();
	return successRes({ res, message: 'success', data: { machines } });
};

export const getMachineByIdHandler = async (req: Request, res: Response) => {
	const { id } = req.params;
	const machine = await findMachineByIdService(id);
	return successRes({ res, message: 'success', data: { machine } });
};

export const createMachineHandler = async (req: Request, res: Response) => {
	const { productId, name } = req.body;
	const machine = await createMachine({ productId, name });
	return successRes({ res, message: 'Berhasil menambahkan mesin baru', data: { machine }, status: 201 });
};

export const updateMachineHandler = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { productId, name } = req.body;

	const machine = await updateMachineService(id, { productId, name });
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

export const checkMachineHandler = async (req: Request, res: Response) => {
	const { statusId } = req.params;
	const payload = req.body;

	const analysis = await checkMachineService(statusId, payload);
	return successRes({ res, message: 'success', data: { analysis } });
};

// Handlers machine status
export const getStatusHandler = async (_: Request, res: Response) => {
	const statuses = await findAllStatus();
	return successRes({ res, message: 'success', data: { statuses } });
};

export const getStatusByMachineIdHandler = async (req: Request, res: Response) => {
	const { machineId } = req.params;
	const statuses = await findStatusByMachineIdService(machineId);
	return successRes({ res, message: 'success', data: { statuses } });
};

export const createStatusHandler = async (req: Request, res: Response) => {
	const { machineId, type, airTemperature, processTemperature, rotationalSpeed, torque, toolWear, target, failureType } = req.body;

	const { analysis, status } = await createStatusService({
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
	return successRes({ res, message: 'Berhasil menambahkan status baru', data: { status, analysis }, status: 201 });
};

export const updateStatusHandler = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { machineId, type, airTemperature, processTemperature, rotationalSpeed, torque, toolWear, target, failureType } = req.body;

	const { analysis, status } = await updateStatusService(id, {
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
	return successRes({ res, data: { status, analysis }, message: 'Data status berhasil diperbarui' });
};

export const deleteStatusHandler = async (req: Request, res: Response) => {
	const { id } = req.params;

	const status = await deleteStatusService(id);
	return successRes({
		res,
		message: 'Data status berhasil dihapus',
		data: { status },
	});
};
