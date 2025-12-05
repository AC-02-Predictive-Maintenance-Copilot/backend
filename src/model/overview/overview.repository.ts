import prisma from '../../lib/prisma';

export const getOverview = async () => {
	const anomalyAnalysis = await prisma.machineAnalysis.findMany({
		where: { isAnomaly: true },
		select: { statusId: true },
	});
	const anomalyStatusIds = anomalyAnalysis.map((a) => a.statusId);

	const agg = await prisma.machineStatus.groupBy({
		by: ['machineId'],
		_count: { id: true },
	});
	const machineIdsWithStatus = agg.map((a) => a.machineId);

	const [
		totalMachines,
		anomalyMachines,
		machinesWithoutStatus,
		activeTickets,
		totalTickets,
		openTickets,
		inProgressTickets,
		resolvedTickets,
		lowPriorityTickets,
		mediumPriorityTickets,
		highPriorityTickets,
		totalUsers,
		unverifiedUsers,
		adminUsers,
		engineerUsers,
		avgHealthScore,
		failureDetected,
		totalMessages,
		recentTickets,
		recentStatuses,
	] = await Promise.all([
		prisma.machine.count(),
		prisma.machineStatus.groupBy({
			by: ['machineId'],
			where: {
				id: { in: anomalyStatusIds },
			},
			_count: { id: true },
		}),
		prisma.machine.count({
			where: {
				id: { notIn: machineIdsWithStatus },
			},
		}),
		prisma.ticket.count({
			where: { status: { not: 'RESOLVED' } },
		}),
		prisma.ticket.count(),
		prisma.ticket.count({ where: { status: 'OPEN' } }),
		prisma.ticket.count({ where: { status: 'IN_PROGRESS' } }),
		prisma.ticket.count({ where: { status: 'RESOLVED' } }),
		prisma.ticket.count({ where: { priority: 'LOW' } }),
		prisma.ticket.count({ where: { priority: 'MEDIUM' } }),
		prisma.ticket.count({ where: { priority: 'HIGH' } }),
		prisma.user.count(),
		prisma.user.count({ where: { isVerified: false } }),
		prisma.user.count({ where: { role: 'ADMIN' } }),
		prisma.user.count({ where: { role: 'ENGINEER' } }),
		prisma.machineAnalysis.aggregate({
			_avg: { healthScore: true },
		}),
		prisma.machineStatus.count({
			where: { failureType: { not: null } },
		}),
		prisma.message.count(),
		prisma.ticket.findMany({
			take: 5,
			orderBy: { createdAt: 'desc' },
		}),
		prisma.machineStatus.findMany({
			take: 5,
			orderBy: { recordedAt: 'desc' },
			include: { machine: true },
		}),
	]);

	return {
		machines: {
			total: totalMachines,
			anomaly: anomalyMachines.length,
			noStatus: machinesWithoutStatus,
		},
		tickets: {
			total: totalTickets,
			active: activeTickets,
			status: {
				open: openTickets,
				inProgress: inProgressTickets,
				resolved: resolvedTickets,
			},
			priority: {
				low: lowPriorityTickets,
				medium: mediumPriorityTickets,
				high: highPriorityTickets,
			},
		},
		users: {
			total: totalUsers,
			unverified: unverifiedUsers,
			admin: adminUsers,
			engineer: engineerUsers,
		},
		health: {
			avgScore: avgHealthScore._avg.healthScore,
			failuresDetected: failureDetected,
		},
		messages: {
			total: totalMessages,
		},
		recent: {
			tickets: recentTickets,
			statuses: recentStatuses,
		},
	};
};
