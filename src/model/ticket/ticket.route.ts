import { Router } from 'express';
import { validateBody, validateParams } from '../../middleware/validate';
import { ticketSchema } from './ticket.validator';
import { createTicketHandler, getTicketHandler, updateTicketHandler, deleteTicketHandler, getTicketByIdHandler } from './ticket.controller';
import { paramsIdSchema } from '../../validator';

const router = Router();

router.get('/', getTicketHandler);
router.get('/:id', validateParams(paramsIdSchema), getTicketByIdHandler);
router.post('/', validateBody(ticketSchema), createTicketHandler);
router.put('/:id', validateParams(paramsIdSchema), updateTicketHandler);
router.delete('/:id', validateParams(paramsIdSchema), deleteTicketHandler);

export default router;
