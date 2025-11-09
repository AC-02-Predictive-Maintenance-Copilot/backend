import prisma from '../../lib/prisma';
import { TMachineInput } from './machine.validator';

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