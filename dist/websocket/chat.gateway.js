"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeChatWebSocket = initializeChatWebSocket;
const ws_1 = require("ws");
const prisma_1 = __importDefault(require("../lib/prisma"));
const agent_service_1 = require("../services/agent.service");
const jwt_1 = require("../lib/jwt");
function initializeChatWebSocket(server) {
    const wss = new ws_1.WebSocketServer({ server, path: '/ws/chat' });
    wss.on('connection', async (socket, req) => {
        const auth = req.headers['authorization'];
        if (!auth)
            return socket.close();
        const decoded = (0, jwt_1.verifyToken)(auth.split(' ')[1]);
        const userId = decoded?.id;
        if (!userId)
            return socket.close();
        const history = await prisma_1.default.message.findMany({
            where: { userId },
            orderBy: { createdAt: 'asc' },
            include: { user: true },
        });
        const machines = await prisma_1.default.machine.findMany({
            include: {
                statuses: {
                    include: {
                        machineAnalysis: true,
                    },
                },
                tickets: true,
            },
        });
        socket.send(JSON.stringify({
            type: 'history',
            data: history,
        }));
        socket.on('message', async (message) => {
            const content = message.toString();
            await prisma_1.default.message.create({
                data: { role: 'USER', content, userId },
            });
            const machineContext = machines
                .map((m) => {
                const lastStatus = m.statuses?.[0];
                const lastAnalysis = lastStatus?.machineAnalysis?.[0];
                const relatedTickets = m.tickets;
                const failures = relatedTickets
                    .filter((t) => t.status !== 'RESOLVED')
                    .map((t) => `[#${t.ticketNumber}] ${t.problem} (${t.status})`)
                    .join('\n') || '-';
                return `
						🔧 MACHINE INFO
						• Name: ${m.name}
						• Product ID: ${m.productId}
						• Last Update: ${lastStatus?.recordedAt.toISOString() ?? '-'}

						📊 SENSOR METRICS (Latest)
						• Air Temperature: ${lastStatus?.airTemperature ?? '-'} °C
						• Process Temperature: ${lastStatus?.processTemperature ?? '-'} °C
						• Rotational Speed: ${lastStatus?.rotationalSpeed ?? '-'} RPM
						• Torque: ${lastStatus?.torque ?? '-'} Nm
						• Tool Wear: ${lastStatus?.toolWear ?? '-'} minutes
						• Target: ${lastStatus?.target ?? '-'}

						🧠 AI ANALYSIS (Latest)
						• Health Score: ${lastAnalysis?.healthScore ?? '-'} / 100
						• Risk Probability: ${(lastAnalysis?.riskProbability ?? 0) * 100}% Chance
						• Status: ${lastAnalysis?.status ?? 'UNKNOWN'}
						• Diagnosis: ${lastAnalysis?.diagnosis ?? '-'}

						⚠️ OPEN TICKETS
						${failures}
						`;
            })
                .join('\n\n====================\n\n');
            const aiReply = await (0, agent_service_1.generateAgentResponseWithContext)(content, machineContext);
            await prisma_1.default.message.create({
                data: { role: 'ASSISTANT', content: aiReply ?? '', userId },
            });
            socket.send(JSON.stringify({
                type: 'message',
                role: 'ASSISTANT',
                content: aiReply,
            }));
        });
    });
    console.log('WebSocket Chat is running 🚀 on /ws/chat');
}
