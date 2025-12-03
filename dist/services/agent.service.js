"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAgentResponse = void 0;
const groq_sdk_1 = __importDefault(require("groq-sdk"));
const GROQ_API_KEY = process.env.GROQ_API_KEY;
if (!GROQ_API_KEY) {
    throw new Error('❌ JWT_SECRET is not defined in environment variables');
}
const client = new groq_sdk_1.default({
    apiKey: GROQ_API_KEY,
});
const generateAgentResponse = async (diagnosis) => {
    const response = await client.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [
            { role: 'system', content: 'Anda adalah AI Maintenance Engineer berpengalaman 20 tahun.' },
            { role: 'user', content: diagnosis },
        ],
        temperature: 0.2,
    });
    return response.choices[0].message.content;
};
exports.generateAgentResponse = generateAgentResponse;
