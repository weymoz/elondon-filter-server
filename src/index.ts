import { logger } from './config/index';
import express from 'express';
import { PORT } from './config';
import './db/connect';
import escorts from './routes/escorts';

const app = express();

app.use('/escorts', escorts);

app.get('/', (req, res) => {
  res.json({
    route: 'elondon helpers',
  });
});

app.listen(PORT, () => {
  logger.info('Server is listening on port: ' + PORT);
});
