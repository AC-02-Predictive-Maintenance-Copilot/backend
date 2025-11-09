import rateLimit, { ipKeyGenerator, RateLimitRequestHandler } from 'express-rate-limit';
import { Request } from 'express';

interface RateLimiterOptions {
	windowMs: number;
	max: number;
	message?: object;
	keyGenerator?: (req: Request) => string;
	context?: string;
}

export const createRateLimiter = ({
	windowMs,
	max,
	message = { message: 'Too many requests, please try again later.' },
	keyGenerator,
	context = 'global',
}: RateLimiterOptions): RateLimitRequestHandler => {
	return rateLimit({
		windowMs,
		max,
		standardHeaders: true,
		legacyHeaders: false,

		keyGenerator: (req: Request): string => {
			try {
				if (keyGenerator) return keyGenerator(req);
				return ipKeyGenerator(String(req.ip));
			} catch {
				return 'unknown';
			}
		},

		handler: (req, res) => {
			const key = keyGenerator ? keyGenerator(req) : ipKeyGenerator(String(req.ip));
			console.warn(`[RateLimit] ${context} | key=${key} | method=${req.method} | url=${req.originalUrl}`);
			res.status(429).json(message);
		},
	});
};
