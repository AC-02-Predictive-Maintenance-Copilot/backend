import { Router } from 'express';
import { getOverviewHandler } from './overview.controller';

const router = Router();

router.get('/', getOverviewHandler);

export default router;
