import { createRateLimiter } from '../../middleware/rateLimiter';

export const loginRateLimiter = createRateLimiter({
	windowMs: 60_000,
	max: 5,
	context: 'login',
	message: { message: 'Terlalu banyak percobaan login. Coba lagi nanti.' },
	keyGenerator: (req) => String(req.body?.email || req.ip),
});
