export function getAllowedOrigins() {
	const env = process.env.CORS_ORIGIN;
	if (!env || env === '*' || env.trim() === '') {
		return '*';
	}
	return env.split(',').map((o) => o.trim());
}
