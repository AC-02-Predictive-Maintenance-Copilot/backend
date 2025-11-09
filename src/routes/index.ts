import { Router } from 'express';
import authRouter from '../model/auth/auth.route';
import machineRouter from '../model/machine/machine.route';

const router = Router();

router.get('/health', (_, res) => {
	res.json({ ok: true, ts: new Date().toISOString() });
});

router.use('/auth', authRouter);
router.use('/machine', machineRouter);

export { router };
