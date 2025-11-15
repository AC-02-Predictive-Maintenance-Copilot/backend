import prisma from '../../lib/prisma';
import { TCheckMachine, TMachineInput, TStatusInput } from './machine.validator';

export const findAllMachines = async () => await prisma.machine.findMany({});

export const findMachineById = async (id: string) =>
	await prisma.machine.findUnique({
		where: { id },
	});

export const createMachine = async (data: TMachineInput) => await prisma.machine.create({ data });

export const updateMachine = async (id: string, data: TMachineInput) =>
	await prisma.machine.update({
		where: { id },
		data,
	});

export const deleteMachine = async (id: string) =>
	await prisma.machine.delete({
		where: { id },
	});

export const saveMachineAnalysis = async ({ statusId, diagnosis, agentMessage }: { statusId: string; diagnosis: TCheckMachine; agentMessage: string }) => {
	return prisma.machineAnalysis.create({
		data: {
			diagnosisJson: diagnosis,
			agentMessage,
			machineStatus: { connect: { id: statusId } },
		},
	});
};

// Repository machine status
export const findAllStatus = async () => await prisma.machineStatus.findMany({});

export const findStatusByMachineId = async (machineId: string) =>
	await prisma.machineStatus.findMany({
		where: { machineId },
	});

export const findStatusById = async (id: string) =>
	await prisma.machineStatus.findUnique({
		where: { id },
	});

export const createStatus = async (data: TStatusInput) => await prisma.machineStatus.create({ data });

export const updateStatus = async (id: string, data: TStatusInput) =>
	await prisma.machineStatus.update({
		where: { id },
		data,
	});

export const deleteStatus = async (id: string) =>
	await prisma.machineStatus.delete({
		where: { id },
	});

export const deleteStatusesByMachineId = async (machineId: string) =>
	await prisma.machineStatus.deleteMany({
		where: { machineId },
	});
