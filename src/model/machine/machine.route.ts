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
    deleteStatusHandler
} from './machine.controller';

const router = Router();

router.get('/', getMachineHandler);
router.get('/:id', getMachineByIdHandler);
router.post('/', validateBody(machineSchema), createMachineHandler);
router.put('/:id', updateMachineHandler);
router.delete("/:id", deleteMachineHandler);

router.get('/status/all', getStatusHandler);
router.get('/status/:machineId', getStatusByMachineIdHandler);
router.post('/status', validateBody(statusSchema), createStatusHandler);
router.put('/status/:id', updateStatusHandler);
router.delete('/status/:id', deleteStatusHandler);

export default router;
