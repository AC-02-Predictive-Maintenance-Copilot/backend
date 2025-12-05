import { getOverview } from './overview.repository';

export const getOverviewService = async () => {
	return await getOverview();
};
