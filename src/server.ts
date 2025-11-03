import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { router } from './routes/index';

const app = express();
const port = process.env.PORT;

app.set('trust proxy', true);
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') || true }));
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

app.use('/api/v1', router);

app.listen(port, () => console.log(`🚀 Server ready on http://localhost:${port}`));
