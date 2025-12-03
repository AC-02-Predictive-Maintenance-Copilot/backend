import { MachineAnalysis } from '@prisma/client';
import Groq from 'groq-sdk';

const GROQ_API_KEY = process.env.GROQ_API_KEY as string;

if (!GROQ_API_KEY) {
	throw new Error('❌ JWT_SECRET is not defined in environment variables');
}

const client = new Groq({
	apiKey: GROQ_API_KEY,
});

export const generateAgentResponse = async (diagnosis: MachineAnalysis) => {
	const response = await client.chat.completions.create({
		model: 'llama-3.3-70b-versatile',
		messages: [
			{ role: 'system', content: 'Anda adalah AI Maintenance Engineer berpengalaman 20 tahun.' },
			{ role: 'user', content: diagnosis.llmPrompt },
		],
		temperature: 0.2,
	});

	return response.choices[0].message.content;
};
