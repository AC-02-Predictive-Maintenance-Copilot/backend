import axios from 'axios';
import { TCheckMachine } from '../model/machine/machine.validator';

export const FASTAPI_URL = process.env.FASTAPI_URL as string;

if (!FASTAPI_URL) {
	throw new Error('❌ FASTAPI_URL is not defined in environment variables');
}

export const checkMachineWithFastAPI = async (payload: TCheckMachine) => {
	const { data } = await axios.post(FASTAPI_URL, payload, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
		},
	});
	return data;
};
