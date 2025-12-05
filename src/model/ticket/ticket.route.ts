import { Router } from 'express';
import { validateBody, validateParams } from '../../middleware/validate';
import { ticketSchema } from './ticket.validator';
import { createTicketHandler, getTicketHandler, updateTicketHandler, deleteTicketHandler, getTicketByIdHandler } from './ticket.controller';
import { paramsIdTicketSchema } from '../../validator';

const router = Router();

router.get('/', getTicketHandler);
router.get('/:id', validateParams(paramsIdTicketSchema), getTicketByIdHandler);
router.post('/', validateBody(ticketSchema), createTicketHandler);
router.put('/:id', validateParams(paramsIdTicketSchema), updateTicketHandler);
router.delete('/:id', validateParams(paramsIdTicketSchema), deleteTicketHandler);

export default router;
