import { Router } from 'express';
import { validateBody } from '../../middleware/validate';
import { checkMachineSchema, machineSchema, statusSchema } from './machine.validator';
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
	checkMachineHandler,
} from './machine.controller';
import { getTicketByMachineIdHandler } from '../ticket/ticket.controller';

const router = Router();

router.get('/', getMachineHandler);
router.get('/:id', getMachineByIdHandler);
router.post('/', validateBody(machineSchema), createMachineHandler);
router.put('/:id', updateMachineHandler);
router.delete('/:id', deleteMachineHandler);

router.post('/check/:statusId', validateBody(checkMachineSchema), checkMachineHandler);

router.get('/statuses/all', getStatusHandler);
router.get('/:machineId/statuses', getStatusByMachineIdHandler);
router.post('/statuses', validateBody(statusSchema), createStatusHandler);
router.put('/statuses/:id', updateStatusHandler);
router.delete('/statuses/:id', deleteStatusHandler);

router.get('/:machineId/tickets', getTicketByMachineIdHandler);

export default router;
