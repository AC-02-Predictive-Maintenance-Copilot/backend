import 'dotenv/config';
import http, { get } from 'http';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { router } from './routes/index';
import { errorHandler } from './middleware/errorHandler';
import { initializeChatWebSocket } from './websocket/chat.gateway';
import { getAllowedOrigins } from './utils/cors';

const app = express();
const port = process.env.PORT;

app.set('trust proxy', true);
app.use(helmet());
app.use(cors({ origin: getAllowedOrigins() }));
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

app.use('/api/v1', router);

const server = http.createServer(app);
initializeChatWebSocket(server);

server.listen(port, () => {
	console.log(`🚀 Server ready on http://localhost:${port}`);
});

app.use((req, res) => {
	res.status(404).json({
		message: 'Route tidak ditemukan',
		method: req.method,
		path: req.originalUrl,
	});
});

app.use(errorHandler);
