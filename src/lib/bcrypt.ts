import bcrypt from 'bcryptjs';

export const hashPassword = async ({ password, salt = 10 }: { password: string; salt?: number }) => await bcrypt.hash(password, salt);

export const comparePassword = async ({ password, hash }: { password: string; hash: string }) => await bcrypt.compare(password, hash);
