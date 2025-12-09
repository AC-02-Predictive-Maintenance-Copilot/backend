"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessageService = exports.getContextMessagesService = void 0;
const client_1 = require("@prisma/client");
const agent_service_1 = require("../../services/agent.service");
const machine_repository_1 = require("../machine/machine.repository");
const message_repository_1 = require("./message.repository");
const getContextMessagesService = async (machines) => {
    if (!machines) {
        machines = await (0, machine_repository_1.findAllMachinesWithRelations)();
    }
    return machines
        .map((m) => {
        const lastStatus = m.statuses?.[0];
        const lastAnalysis = lastStatus?.machineAnalysis?.[0];
        const relatedTickets = m.tickets;
        const failures = relatedTickets
            .filter((t) => t.status !== 'RESOLVED')
            .map((t) => `[#${t.ticketNumber}] ${t.problem} (${t.status})`)
            .join('\n') || '-';
        return `🔧 MACHINE INFO
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
• Risk Probability: ${lastAnalysis?.riskProbability ?? 0}% Chance
• Status: ${lastAnalysis?.status ?? 'UNKNOWN'}
• Diagnosis: ${lastAnalysis?.diagnosis ?? '-'}

⚠️ OPEN TICKETS
${failures}`;
    })
        .join('\n\n====================\n\n');
};
exports.getContextMessagesService = getContextMessagesService;
const createMessageService = async (userId, content) => {
    await (0, message_repository_1.createMessage)({ userId, role: client_1.EMessageRole.USER, data: { content } });
    const context = await (0, exports.getContextMessagesService)();
    const aiReply = await (0, agent_service_1.generateAgentResponseWithContext)(content, context);
    const message = await (0, message_repository_1.createMessage)({ userId, role: client_1.EMessageRole.ASSISTANT, data: { content: aiReply ?? '' } });
    return message;
};
exports.createMessageService = createMessageService;
