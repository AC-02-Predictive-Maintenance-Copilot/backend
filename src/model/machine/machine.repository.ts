import prisma from '../../lib/prisma';
import { TMachineInput } from './machine.validator';

export const findAllMachines = async () => await prisma.machine.findMany({});

export const createMachine = async (data: TMachineInput) => await prisma.machine.create({ data });
