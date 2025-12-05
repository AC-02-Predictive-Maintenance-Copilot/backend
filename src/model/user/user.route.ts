import { Router } from 'express';
import { requireAdmin } from '../../middleware/auth';
import { deleteUserHandler, getAllUsersHandler, getUserByIdHandler, unverifyUserHandler, verifyUserHandler } from './user.controller';
import { validateParams } from '../../middleware/validate';
import { paramsIdSchema } from '../../validator';

const router = Router();

router.use(requireAdmin);
router.get('/', getAllUsersHandler);
router.get('/:id', validateParams(paramsIdSchema), getUserByIdHandler);
router.patch('/:id/verify', validateParams(paramsIdSchema), verifyUserHandler);
router.patch('/:id/unverify', validateParams(paramsIdSchema), unverifyUserHandler);
router.delete('/:id', validateParams(paramsIdSchema), deleteUserHandler);

export default router;
