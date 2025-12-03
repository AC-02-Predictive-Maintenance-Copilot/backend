import { WebSocketServer, WebSocket } from 'ws';
import prisma from '../lib/prisma';
import { AuthRequest } from '../middleware/auth';
import { generateAgentResponseWithContext } from '../services/agent.service';
import { verifyToken } from '../lib/jwt';

export function initializeChatWebSocket(server: any) {
	const wss = new WebSocketServer({ server, path: '/ws/chat' });

	wss.on('connection', async (socket: WebSocket, req: AuthRequest) => {
		const auth = req.headers['authorization'];
		if (!auth) return socket.close();

		const decoded = verifyToken(auth.split(' ')[1]);
		const userId = decoded?.id;
		if (!userId) return socket.close();

		const history = await prisma.message.findMany({
			where: { userId },
			orderBy: { createdAt: 'asc' },
			include: { user: true },
		});

		const machines = await prisma.machine.findMany({
			include: {
				statuses: {
					include: {
						machineAnalysis: true,
					},
				},
				tickets: true,
			},
		});

		socket.send(
			JSON.stringify({
				type: 'history',
				data: history,
			})
		);

		socket.on('message', async (message: string) => {
			const content = message.toString();

			await prisma.message.create({
				data: { role: 'USER', content, userId },
			});

			const machineContext = machines
				.map((m) => {
					const lastStatus = m.statuses?.[0];
					const lastAnalysis = lastStatus?.machineAnalysis?.[0];
					const relatedTickets = m.tickets;

					const failures =
						relatedTickets
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

			const aiReply = await generateAgentResponseWithContext(content, machineContext);

			await prisma.message.create({
				data: { role: 'ASSISTANT', content: aiReply ?? '', userId },
			});

			socket.send(
				JSON.stringify({
					type: 'message',
					role: 'ASSISTANT',
					content: aiReply,
				})
			);
		});
	});

	console.log('WebSocket Chat is running 🚀 on /ws/chat');
}
