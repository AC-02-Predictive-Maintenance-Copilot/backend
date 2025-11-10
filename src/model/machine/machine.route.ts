import { Router } from 'express';
import { validateBody } from '../../middleware/validate';
import { machineSchema } from './machine.validator';
import { 
    createMachineHandler,
    getMachineByIdHandler,
    getMachineHandler,
    updateMachineHandler,
    deleteMachineHandler
} from './machine.controller';

const router = Router();

router.get('/', getMachineHandler);
router.get('/:id', getMachineByIdHandler);
router.post('/', validateBody(machineSchema), createMachineHandler);
router.put('/:id', updateMachineHandler);
router.delete("/:id", deleteMachineHandler);

export default router;
