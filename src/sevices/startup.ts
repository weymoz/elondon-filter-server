import EscortsController from '../controllers/EscortsController';
import { contentfulReqest } from './http-client';
import Escorts from '../db/models/escorts';

(async () => {
  const escortsController = new EscortsController(contentfulReqest, Escorts);
  await escortsController.fetchAndUpdate();
})();
