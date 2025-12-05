import { Router } from 'express';
import authRouter from '../model/auth/auth.route';
import machineRouter from '../model/machine/machine.route';
import ticketRouter from '../model/ticket/ticket.route';
import messageRouter from '../model/message/message.route';
import userRouter from '../model/user/user.route';
import overviewRouter from '../model/overview/overview.route';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.get('/health', (_, res) => {
	res.json({ ok: true, ts: new Date().toISOString() });
});

router.use('/auth', authRouter);

router.use(requireAuth);
router.use('/machines', machineRouter);
router.use('/tickets', ticketRouter);
router.use('/chat', messageRouter);
router.use('/users', userRouter);
router.use('/overview', overviewRouter);

export { router };
