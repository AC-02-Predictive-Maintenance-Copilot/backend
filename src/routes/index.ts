import { Router } from 'express';
import authRouter from '../model/auth/auth.route';
import machineRouter from '../model/machine/machine.route';
import ticketRouter from '../model/ticket/ticket.route';
import { requireAuth } from '../middleware/auth';

const router = Router();

export const machinePath = '/machines';
export const statusPath = '/statuses';
export const ticketPath = '/tickets';

router.get('/health', (_, res) => {
	res.json({ ok: true, ts: new Date().toISOString() });
});

router.use('/auth', authRouter);

router.use(requireAuth);
router.use(machinePath, machineRouter);
router.use(ticketPath, ticketRouter);

export { router };
