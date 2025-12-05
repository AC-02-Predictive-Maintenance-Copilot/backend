"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOverview = void 0;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const getOverview = async () => {
    const [totalMachines, anomalyMachines, machinesWithoutStatus, activeTickets, totalTickets, openTickets, inProgressTickets, resolvedTickets, lowPriorityTickets, mediumPriorityTickets, highPriorityTickets, totalUsers, unverifiedUsers, adminUsers, engineerUsers, avgHealthScore, failureDetected, totalMessages, recentTickets, recentStatuses,] = await Promise.all([
        prisma_1.default.machine.count(),
        prisma_1.default.machineStatus.groupBy({
            by: ['machineId'],
            _count: true,
            where: {
                machineAnalysis: {
                    some: { isAnomaly: true },
                },
            },
        }),
        prisma_1.default.machine.count({
            where: { statuses: { none: {} } },
        }),
        prisma_1.default.ticket.count({
            where: { status: { not: 'RESOLVED' } },
        }),
        prisma_1.default.ticket.count(),
        prisma_1.default.ticket.count({ where: { status: 'OPEN' } }),
        prisma_1.default.ticket.count({ where: { status: 'IN_PROGRESS' } }),
        prisma_1.default.ticket.count({ where: { status: 'RESOLVED' } }),
        prisma_1.default.ticket.count({ where: { priority: 'LOW' } }),
        prisma_1.default.ticket.count({ where: { priority: 'MEDIUM' } }),
        prisma_1.default.ticket.count({ where: { priority: 'HIGH' } }),
        prisma_1.default.user.count(),
        prisma_1.default.user.count({ where: { isVerified: false } }),
        prisma_1.default.user.count({ where: { role: 'ADMIN' } }),
        prisma_1.default.user.count({ where: { role: 'ENGINEER' } }),
        prisma_1.default.machineAnalysis.aggregate({
            _avg: { healthScore: true },
        }),
        prisma_1.default.machineStatus.count({
            where: { failureType: { not: null } },
        }),
        prisma_1.default.message.count(),
        prisma_1.default.ticket.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
        }),
        prisma_1.default.machineStatus.findMany({
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
exports.getOverview = getOverview;
