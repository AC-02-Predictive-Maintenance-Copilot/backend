import { Router } from 'express';
import { validateBody } from '../../middleware/validate';
import { ticketSchema } from './user.validator';
import { createTicketHandler, getTicketHandler, updateTicketHandler, deleteTicketHandler, getTicketByIdHandler } from './user.controller';

const router = Router();

router.get('/', getTicketHandler);
router.get('/:id', getTicketByIdHandler);
router.post('/', validateBody(ticketSchema), createTicketHandler);
router.put('/:id', updateTicketHandler);
router.delete('/:id', deleteTicketHandler);

export default router;
