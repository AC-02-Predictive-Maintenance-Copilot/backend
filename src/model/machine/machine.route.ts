import { Router } from 'express';
import { validateBody } from '../../middleware/validate';
import { createMachineHandler, getMachineHandler } from './machine.controller';
import { machineSchema } from './machine.validator';

const router = Router();

router.get('/', getMachineHandler);
router.post('/', validateBody(machineSchema), createMachineHandler);

export default router;
