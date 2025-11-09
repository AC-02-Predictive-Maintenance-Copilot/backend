import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../lib/jwt';

if (!JWT_SECRET) {
	throw new Error('❌ JWT_SECRET is not defined in environment variables');
}

export interface AuthRequest extends Request {
	user?: { id: string; email: string };
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
	const header = req.header('Authorization');
	if (!header?.startsWith('Bearer ')) {
		return res.status(401).json({ message: 'Token tidak ditemukan' });
	}
	const token = header.split(' ')[1];
	try {
		const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string };
		req.user = decoded;
		next();
	} catch {
		return res.status(401).json({ message: 'Token tidak valid' });
	}
}
