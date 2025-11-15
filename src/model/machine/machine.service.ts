import { HttpError } from '../../utils/httpError';
import { deleteTicketsByMachineId } from '../ticket/ticket.repository';
import { deleteMachine, deleteStatusesByMachineId, findMachineById } from './machine.repository';

export const findMachineByIdService = async (machineId: string) => {
	const machine = await findMachineById(machineId);
	if (!machine) throw new HttpError('Mesin tidak ditemukan', 404);
};

export const deleteMachineService = async ({ machineId }: { machineId: string }) => {
	await findMachineByIdService(machineId);
	await deleteStatusesByMachineId(machineId);
	await deleteTicketsByMachineId(machineId);
	return await deleteMachine(machineId);
};
