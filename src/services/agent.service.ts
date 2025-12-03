import Groq from 'groq-sdk';

const GROQ_API_KEY = process.env.GROQ_API_KEY as string;

if (!GROQ_API_KEY) {
	throw new Error('❌ JWT_SECRET is not defined in environment variables');
}

const client = new Groq({
	apiKey: GROQ_API_KEY,
});

const model = 'llama-3.3-70b-versatile';
const temperature = 0.2;
const systemPrompt = 'Anda adalah AI Maintenance Engineer berpengalaman 20 tahun.';

export const generateAgentResponse = async (content: string) => {
	const response = await client.chat.completions.create({
		model,
		messages: [
			{ role: 'system', content: systemPrompt },
			{ role: 'user', content },
		],
		temperature,
	});

	return response.choices[0].message.content;
};

export const generateAgentResponseWithContext = async (content: string, context: string) => {
	const response = await client.chat.completions.create({
		model,
		messages: [
			{ role: 'system', content: systemPrompt },
			{ role: 'system', content: `Berikut adalah konteks tambahan yang mungkin berguna untuk menjawab pertanyaan:\n${context}` },
			{ role: 'user', content },
		],
		temperature,
	});
	return response.choices[0].message.content;
};
