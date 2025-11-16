import { Router } from 'express';
import { validateBody } from '../../middleware/validate';
import { loginSchema, registerSchema } from './auth.validator';
import { getAuthUserHandler, loginHandler, registerHandler } from './auth.controller';
import { loginRateLimiter } from './auth.limiter';
import { AuthRequest, requireAuth } from '../../middleware/auth';
import { createRateLimiter } from '../../middleware/rateLimiter';
import { successRes } from '../../utils/response';

const router = Router();

router.use(
	createRateLimiter({
		windowMs: 15 * 60 * 1000,
		max: 100,
		context: 'auth',
	})
);

router.post('/register', validateBody(registerSchema), registerHandler);

router.post('/login', loginRateLimiter, validateBody(loginSchema), loginHandler);

router.get('/me', requireAuth, getAuthUserHandler);

export default router;
