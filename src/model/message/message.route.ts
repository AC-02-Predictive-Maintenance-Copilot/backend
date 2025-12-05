import { Router } from 'express';
import { validateBody, validateParams } from '../../middleware/validate';
import { messageSchema } from './message.validator';
import { createMessageHandler, deleteAllMessagesHandler, deleteMessageByIdHandler, getMessagesHandler } from './message.controller';
import { paramsIdSchema } from '../../validator';

const router = Router();

router.get('/', getMessagesHandler);
router.post('/', validateBody(messageSchema), createMessageHandler);
router.delete('/', deleteAllMessagesHandler);
router.delete('/:id', validateParams(paramsIdSchema), deleteMessageByIdHandler);

export default router;
