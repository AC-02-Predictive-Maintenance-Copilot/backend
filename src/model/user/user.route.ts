import { Router } from 'express';
import { requireAdmin } from '../../middleware/auth';
import { deleteUserHandler, getAllUsersHandler, getUserByIdHandler, unverifyUserHandler, verifyUserHandler } from './user.controller';

const router = Router();

router.use(requireAdmin);
router.get('/', getAllUsersHandler);
router.get('/:id', getUserByIdHandler);
router.patch('/verify/:id', verifyUserHandler);
router.patch('/unverify/:id', unverifyUserHandler);
router.delete('/:id', deleteUserHandler);

export default router;
