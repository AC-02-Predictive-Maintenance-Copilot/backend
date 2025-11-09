import { Router } from 'express';
import { validateBody } from '../../middleware/validate';
import { createMachineHandler, getMachineByIdHandler, getMachineHandler } from './machine.controller';
import { machineSchema } from './machine.validator';

const router = Router();

router.get('/', getMachineHandler);
router.get('/:id', getMachineByIdHandler);
router.post('/', validateBody(machineSchema), createMachineHandler);

export default router;
