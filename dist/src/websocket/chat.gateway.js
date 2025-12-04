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
const message_repository_1 = require("../model/message/message.repository");
const machine_repository_1 = require("../model/machine/machine.repository");
const message_service_1 = require("../model/message/message.service");
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
        const history = await (0, message_repository_1.findAllMessages)(userId);
        const machines = await (0, machine_repository_1.findAllMachinesWithRelations)();
        socket.send(JSON.stringify({
            type: 'history',
            data: history,
        }));
        socket.on('message', async (message) => {
            const content = message.toString();
            await prisma_1.default.message.create({
                data: { role: 'USER', content, userId },
            });
            const machineContext = await (0, message_service_1.getContextMessagesService)(machines);
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
