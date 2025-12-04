"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAgentResponseWithContext = exports.generateAgentResponse = void 0;
const groq_sdk_1 = __importDefault(require("groq-sdk"));
const GROQ_API_KEY = process.env.GROQ_API_KEY;
if (!GROQ_API_KEY) {
    throw new Error('❌ JWT_SECRET is not defined in environment variables');
}
const client = new groq_sdk_1.default({
    apiKey: GROQ_API_KEY,
});
const model = 'llama-3.3-70b-versatile';
const temperature = 0.2;
const systemPrompt = 'Anda adalah AI Maintenance Engineer berpengalaman 20 tahun.';
const generateAgentResponse = async (content) => {
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
exports.generateAgentResponse = generateAgentResponse;
const generateAgentResponseWithContext = async (content, context) => {
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
exports.generateAgentResponseWithContext = generateAgentResponseWithContext;
