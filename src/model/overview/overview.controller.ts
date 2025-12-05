import { Response } from 'express';
import { successRes } from '../../utils/response';
import { getOverviewService } from './overview.service';
import { AuthRequest } from '../../middleware/auth';
import { ERole } from '@prisma/client';

export const getOverviewHandler = async (req: AuthRequest, res: Response) => {
	const isAdmin = req.user?.role === ERole.ADMIN;
	const overview = await getOverviewService();
	const { users, ...overviewWithoutUsers } = overview;
	return successRes({ res, message: 'success', data: { overview: { ...(isAdmin ? overview : overviewWithoutUsers) } } });
};
