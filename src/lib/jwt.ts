import jwt, { Secret, SignOptions } from 'jsonwebtoken';

export const JWT_SECRET = process.env.JWT_SECRET as Secret;

if (!JWT_SECRET) {
	throw new Error('❌ JWT_SECRET is not defined in environment variables');
}

export function signToken(payload: string | object | Buffer, expiresIn = '1d'): string {
	const options: SignOptions = { expiresIn: expiresIn as unknown as number };
	return jwt.sign(payload, JWT_SECRET, options);
}

export function verifyToken(token: string) {
	try {
		const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string; role: string };
		return decoded;
	} catch {
		return null;
	}
}
