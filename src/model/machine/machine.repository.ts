import prisma from '../../lib/prisma';
import { TMachineInput, TStatusInput } from './machine.validator';

export const findAllMachines = async () => await prisma.machine.findMany({});

export const findMachineById = async (id: string) =>
    await prisma.machine.findUnique({
        where: { id },
    });

export const createMachine = async (data: TMachineInput) => await prisma.machine.create({ data });

export const updateMachine = async (id: string, data: any) =>
    await prisma.machine.update({
        where: { id },
        data,
    });

export const deleteMachine = async (id: string) =>
    await prisma.machine.delete({
        where: { id },
    });

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

export const updateStatus = async (id: string, data: any) =>
    await prisma.machineStatus.update({
        where: { id },
        data,
    });

export const deleteStatus = async (id: string) =>
    await prisma.machineStatus.delete({
        where: { id },
    });