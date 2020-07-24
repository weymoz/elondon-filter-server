import { logger } from './config/index';
import express from 'express';
import cors from 'cors';
import { PORT } from './config';
import './db/connect';
import escorts from './routes/escorts';
import './sevices/startup';

const app = express();

app.use(cors());

app.use('/escorts', escorts);

app.get('/', (req, res) => {
  res.json({
    route: 'elondon helpers',
  });
});

app.listen(PORT, () => {
  logger.info('Server is listening on port: ' + PORT);
});
