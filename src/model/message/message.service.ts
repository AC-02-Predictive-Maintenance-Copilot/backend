import { EMessageRole } from '@prisma/client';
import { generateAgentResponseWithContext } from '../../services/agent.service';
import { findAllMachinesWithRelations } from '../machine/machine.repository';
import { createMessage } from './message.repository';
import { TMachineWithRelations } from '../machine/machine.validator';

export const getContextMessagesService = async (machines?: TMachineWithRelations[]) => {
	if (!machines) {
		machines = await findAllMachinesWithRelations();
	}
	return machines
		.map((m) => {
			const lastStatus = m.statuses?.[0];
			const lastAnalysis = lastStatus?.machineAnalysis?.[0];
			const relatedTickets = m.tickets;

			const failures =
				relatedTickets
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
• Risk Probability: ${(lastAnalysis?.riskProbability ?? 0) * 100}% Chance
• Status: ${lastAnalysis?.status ?? 'UNKNOWN'}
• Diagnosis: ${lastAnalysis?.diagnosis ?? '-'}

⚠️ OPEN TICKETS
${failures}`;
		})
		.join('\n\n====================\n\n');
};

export const createMessageService = async (userId: string, content: string) => {
	await createMessage({ userId, role: EMessageRole.USER, data: { content } });
	const context = await getContextMessagesService();
	const aiReply = await generateAgentResponseWithContext(content, context);
	const message = await createMessage({ userId, role: EMessageRole.ASSISTANT, data: { content: aiReply ?? '' } });
	return message;
};
