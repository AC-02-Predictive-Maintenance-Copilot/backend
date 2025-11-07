import { Router } from 'express';
import machineRouter from '../model/machine/machine.route.js';

const router = Router();

router.get('/health', (_, res) => {
	res.json({ ok: true, ts: new Date().toISOString() });
});

router.use('/machine', machineRouter);

export { router };
