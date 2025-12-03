import { Router } from 'express';
import { validateBody } from '../../middleware/validate';
import { messageSchema } from './message.validator';
import { createMessageHandler, deleteAllMessagesHandler, deleteMessageByIdHandler, getMessagesHandler } from './message.controller';

const router = Router();

router.get('/', getMessagesHandler);
router.post('/', validateBody(messageSchema), createMessageHandler);
router.delete('/', deleteAllMessagesHandler);
router.delete('/:id', deleteMessageByIdHandler);

export default router;
