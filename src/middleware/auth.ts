import { Request, Response, NextFunction } from 'express';
import { JWT_SECRET, verifyToken } from '../lib/jwt';
import { ERole } from '@prisma/client';

if (!JWT_SECRET) {
	throw new Error('❌ JWT_SECRET is not defined in environment variables');
}

export interface AuthRequest extends Request {
	user?: { id: string; email: string; role: string };
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
	const header = req.header('Authorization');
	if (!header?.startsWith('Bearer ')) {
		return res.status(401).json({ message: 'Token tidak ditemukan' });
	}
	const decoded = verifyToken(header.split(' ')[1]);
	if (!decoded) {
		return res.status(401).json({ message: 'Token tidak valid' });
	}
	req.user = decoded;
	next();
}

export function requireAdmin(req: AuthRequest, res: Response, next: NextFunction) {
	if (req.user?.role !== ERole.ADMIN) {
		return res.status(403).json({ message: 'Akses ditolak: Admin saja' });
	}
	next();
}
