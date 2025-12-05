import { generateAgentResponse } from '../../services/agent.service';
import { checkMachineWithFastAPI } from '../../services/fastapi.service';
import { HttpError } from '../../utils/httpError';
import { deleteTicketsByMachineId } from '../ticket/ticket.repository';
import {
	createStatus,
	deleteMachine,
	deleteStatus,
	deleteStatusesByMachineId,
	findMachineById,
	findMachineByProductId,
	findStatusById,
	findStatusByMachineId,
	saveMachineAnalysis,
	updateMachine,
	updateStatus,
} from './machine.repository';
import { TCheckMachine } from './machine.validator';

export const findMachineByIdService = async (machineId: string) => {
	const machine = await findMachineById(machineId);
	if (!machine) throw new HttpError('Mesin tidak ditemukan', 404);
	return machine;
};

export const findMachineByProductIdService = async (productId: string) => {
	const machine = await findMachineByProductId(productId);
	if (!machine) throw new HttpError('Mesin tidak ditemukan', 404);
	return machine;
};

export const updateMachineService = async (machineId: string, data: { productId: string; name: string }) => {
	await findMachineByIdService(machineId);
	return await updateMachine(machineId, data);
};

export const checkMachineService = async (statusId: string, payload: TCheckMachine) => {
	const diagnosis = await checkMachineWithFastAPI(payload);
	const agentMessage = await generateAgentResponse(diagnosis.llm_prompt);

	if (!agentMessage) {
		throw new HttpError('Gagal menghasilkan analisis dari AI', 500);
	}

	const analysis = await saveMachineAnalysis({
		statusId,
		diagnosis,
		agentMessage,
	});

	return analysis;
};

export const deleteMachineService = async ({ machineId }: { machineId: string }) => {
	await findMachineByIdService(machineId);
	await deleteStatusesByMachineId(machineId);
	await deleteTicketsByMachineId(machineId);
	return await deleteMachine(machineId);
};

export const findStatusByIdService = async (statusId: string) => {
	const status = await findStatusById(statusId);
	if (!status) {
		throw new HttpError('Status tidak ditemukan', 404);
	}
	return status;
};

export const findStatusByMachineIdService = async (machineId: string) => {
	const statuses = await findStatusByMachineId(machineId);
	if (!statuses) {
		throw new HttpError('Status mesin tidak ditemukan', 404);
	}
	return statuses;
};

export const createStatusService = async (data: {
	machineId: string;
	type: 'L' | 'M' | 'H';
	airTemperature: number;
	processTemperature: number;
	rotationalSpeed: number;
	torque: number;
	toolWear: number;
	target: number;
	failureType: string;
}) => {
	const { machineId, type, airTemperature, processTemperature, rotationalSpeed, torque, toolWear, target, failureType } = data;

	await findMachineByIdService(machineId);

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

	const analysis = await checkMachineService(status.id, {
		air_temp: airTemperature,
		process_temp: processTemperature,
		rpm: rotationalSpeed,
		torque,
		tool_wear: toolWear,
		type,
	});

	return { analysis, status };
};

export const updateStatusService = async (
	statusId: string,
	data: {
		machineId: string;
		type: 'L' | 'M' | 'H';
		airTemperature: number;
		processTemperature: number;
		rotationalSpeed: number;
		torque: number;
		toolWear: number;
		target: number;
		failureType: string;
	}
) => {
	const { machineId, type, airTemperature, processTemperature, rotationalSpeed, torque, toolWear, target, failureType } = data;

	await findMachineByIdService(machineId);
	await findStatusByIdService(statusId);

	const status = await updateStatus(statusId, {
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

	const analysis = await checkMachineService(status.id, {
		air_temp: airTemperature,
		process_temp: processTemperature,
		rpm: rotationalSpeed,
		torque,
		tool_wear: toolWear,
		type,
	});

	return { analysis, status };
};

export const deleteStatusService = async (statusId: string) => {
	await findStatusByIdService(statusId);
	return await deleteStatus(statusId);
};
