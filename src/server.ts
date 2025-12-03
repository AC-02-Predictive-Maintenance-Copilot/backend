import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { router } from './routes/index';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const port = process.env.PORT;

app.set('trust proxy', true);
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') || true }));
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

app.use('/api/v1', router);

app.use((req, res) => {
	res.status(404).json({
		message: 'Route tidak ditemukan',
		method: req.method,
		path: req.originalUrl,
	});
});

app.use(errorHandler);

app.listen(port, () => console.log(`🚀 Server ready on http://localhost:${port}`));
