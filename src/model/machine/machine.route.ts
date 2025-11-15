import { Router } from 'express';
import { validateBody } from '../../middleware/validate';
import { machineSchema, statusSchema } from './machine.validator';
import {
	createMachineHandler,
	getMachineByIdHandler,
	getMachineHandler,
	updateMachineHandler,
	deleteMachineHandler,
	getStatusHandler,
	getStatusByMachineIdHandler,
	createStatusHandler,
	updateStatusHandler,
	deleteStatusHandler,
} from './machine.controller';
import { getTicketByMachineIdHandler } from '../ticket/ticket.controller';
import { statusPath } from '../../routes';

const router = Router();

router.get('/', getMachineHandler);
router.get('/:id', getMachineByIdHandler);
router.post('/', validateBody(machineSchema), createMachineHandler);
router.put('/:id', updateMachineHandler);
router.delete('/:id', deleteMachineHandler);

router.get(`${statusPath}/all`, getStatusHandler);
router.get(`/:machineId${statusPath}`, getStatusByMachineIdHandler);
router.post(`${statusPath}`, validateBody(statusSchema), createStatusHandler);
router.put(`${statusPath}/:id`, updateStatusHandler);
router.delete(`${statusPath}/:id`, deleteStatusHandler);

router.get(`/:machineId/tickets`, getTicketByMachineIdHandler);

export default router;
