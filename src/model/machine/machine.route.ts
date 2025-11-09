import { Router } from 'express';
import { validateBody } from '../../middleware/validate';
import { machineSchema } from './machine.validator';
import { 
    createMachineHandler,
    getMachineByIdHandler,
    getMachineHandler,
    updateMachineHandler
} from './machine.controller';

const router = Router();

router.get('/', getMachineHandler);
router.get('/:id', getMachineByIdHandler);
router.post('/', validateBody(machineSchema), createMachineHandler);
router.put('/:id', updateMachineHandler);

export default router;
