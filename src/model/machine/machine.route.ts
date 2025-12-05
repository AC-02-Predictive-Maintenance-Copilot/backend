import { Router } from 'express';
import { validateBody, validateParams } from '../../middleware/validate';
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
import { paramsIdSchema, paramsStatusIdSchema } from '../../validator';

const router = Router();

router.get('/', getMachineHandler);
router.get('/:id', validateParams(paramsIdSchema), getMachineByIdHandler);
router.post('/', validateBody(machineSchema), createMachineHandler);
router.put('/:id', validateParams(paramsIdSchema), updateMachineHandler);
router.delete('/:id', validateParams(paramsIdSchema), deleteMachineHandler);

router.post('/check/:statusId', validateParams(paramsStatusIdSchema), validateBody(checkMachineSchema), checkMachineHandler);

router.get('/statuses/all', getStatusHandler);
router.get('/:machineId/statuses', getStatusByMachineIdHandler);
router.post('/statuses', validateBody(statusSchema), createStatusHandler);
router.put('/statuses/:id', validateParams(paramsIdSchema), updateStatusHandler);
router.delete('/statuses/:id', validateParams(paramsIdSchema), deleteStatusHandler);

router.get('/:machineId/tickets', getTicketByMachineIdHandler);

export default router;
