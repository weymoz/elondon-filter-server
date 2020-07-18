import mongoose from 'mongoose';
import { MONGODB_CONNECT_URL } from '../config';
import { logger } from '../config';

(async () => {
  try {
    await mongoose.connect(MONGODB_CONNECT_URL!, { useNewUrlParser: true });
  } catch (err) {
    logger.error(err);
  }
})();

mongoose.connection.on('error', (err) => {
  logger.error(err);
});
