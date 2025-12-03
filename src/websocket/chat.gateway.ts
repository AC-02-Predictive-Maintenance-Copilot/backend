import { WebSocketServer, WebSocket } from 'ws';
import prisma from '../lib/prisma';
import { AuthRequest } from '../middleware/auth';
import { generateAgentResponseWithContext } from '../services/agent.service';
import { verifyToken } from '../lib/jwt';
import { findAllMessages } from '../model/message/message.repository';
import { findAllMachinesWithRelations } from '../model/machine/machine.repository';
import { getContextMessagesService } from '../model/message/message.service';

export function initializeChatWebSocket(server: any) {
	const wss = new WebSocketServer({ server, path: '/ws/chat' });

	wss.on('connection', async (socket: WebSocket, req: AuthRequest) => {
		const auth = req.headers['authorization'];
		if (!auth) return socket.close();

		const decoded = verifyToken(auth.split(' ')[1]);
		const userId = decoded?.id;
		if (!userId) return socket.close();

		const history = await findAllMessages(userId);

		const machines = await findAllMachinesWithRelations();

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

			const machineContext = await getContextMessagesService(machines);

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
